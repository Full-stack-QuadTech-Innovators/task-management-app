import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3009",
	withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] =
							"Bearer " + token;
						return axiosInstance(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data } = await axiosInstance.post(
					"/api/users/refresh-token"
				);
				const { accessToken } = data;
				axios.defaults.headers.common["Authorization"] =
					"Bearer " + accessToken;
				originalRequest.headers["Authorization"] =
					"Bearer " + accessToken;
				processQueue(null, accessToken);
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError, null);
				// Redirect to login or dispatch logout action
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
// 	baseURL: "http://localhost:3009",
// 	withCredentials: true,
// });

// axiosInstance.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;

// 		if (!error.response) {
// 			console.error("Network error:", error.message);
// 			return Promise.reject(error);
// 		}

// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;
// 			try {
// 				const response = await axiosInstance.post(
// 					"/api/users/refresh-token"
// 				);

// 				const { accessToken } = response.data;
// 				localStorage.setItem("accessToken", accessToken);
// 				axiosInstance.defaults.headers.common[
// 					"Authorization"
// 				] = `Bearer ${accessToken}`;
// 				originalRequest.headers[
// 					"Authorization"
// 				] = `Bearer ${accessToken}`;

// 				return axiosInstance(originalRequest);
// 			} catch (refreshError) {
// 				console.error("Refresh token error:", refreshError);
// 				localStorage.removeItem("accessToken");
// 				// You might want to redirect to login page or dispatch a logout action here
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );

// export default axiosInstance;
