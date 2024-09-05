import axios, {
	AxiosInstance,
	AxiosError,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";

const chatAxiosInstance: AxiosInstance = axios.create({
	baseURL: "http://localhost:3009",
	withCredentials: true,
});

let isRefreshing = false;
let failedQueue: Array<{
	resolve: (value?: unknown) => void;
	reject: (reason?: any) => void;
}> = [];

const processQueue = (
	error: AxiosError | null,
	token: string | null = null
) => {
	failedQueue.forEach((prom) => {
		if (error) {
			prom.reject(error);
		} else {
			prom.resolve(token);
		}
	});
	failedQueue = [];
};

chatAxiosInstance.interceptors.response.use(
	(response: AxiosResponse) => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & {
			_retry?: boolean;
		};
		if (error.response?.status === 401 && !originalRequest._retry) {
			if (isRefreshing) {
				return new Promise((resolve, reject) => {
					failedQueue.push({ resolve, reject });
				})
					.then((token) => {
						originalRequest.headers["Authorization"] =
							"Bearer " + token;
						return chatAxiosInstance(originalRequest);
					})
					.catch((err) => Promise.reject(err));
			}

			originalRequest._retry = true;
			isRefreshing = true;

			try {
				const { data } = await chatAxiosInstance.post<{
					accessToken: string;
				}>("/api/users/refresh-token");
				const { accessToken } = data;

				axios.defaults.headers.common["Authorization"] =
					"Bearer " + accessToken;
				originalRequest.headers["Authorization"] =
					"Bearer " + accessToken;

				// Dispatch an event to notify that the token has been refreshed
				window.dispatchEvent(new Event("accessTokenRefreshed"));

				processQueue(null, accessToken);
				return chatAxiosInstance(originalRequest);
			} catch (refreshError) {
				processQueue(refreshError as AxiosError, null);
				// Redirect to login or dispatch logout action
				return Promise.reject(refreshError);
			} finally {
				isRefreshing = false;
			}
		}
		return Promise.reject(error);
	}
);

export default chatAxiosInstance;
