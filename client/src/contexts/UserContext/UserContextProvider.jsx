// import React, {
// 	useState,
// 	useMemo,
// 	useEffect,
// 	useCallback,
// 	useRef,
// } from "react";
// import axiosInstance from "../../axiosInterceptor";

// import UserContext from "./UserContext";
// import axios from "axios";

// axiosInstance.interceptors.request.use(
// 	(config) => {
// 		const token = localStorage.getItem("accessToken");
// 		if (token) {
// 			config.headers["Authorization"] = `Bearer ${token}`;
// 		}
// 		return config;
// 	},
// 	(error) => {
// 		return Promise.reject(error);
// 	}
// );

// function UserContextProvider({ children }) {
// 	const [userList, setUserList] = useState([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [currentUser, setCurrentUser] = useState(null);
// 	const lastCheckedRef = useRef(0);
// 	const checkingUserRef = useRef(false);

// 	const getUsers = useCallback(async () => {
// 		const token = localStorage.getItem("accessToken");
// 		if (!token) {
// 			console.log("No token found, skipping user fetch");
// 			return;
// 		}
// 		console.log("starting to get users");
// 		setIsLoading(true);
// 		try {
// 			const response = await axiosInstance.get("/api/users");
// 			setUserList(response.data);
// 		} catch (error) {
// 			console.error("Failed to fetch users:", error);
// 			if (error.response && error.response.status === 401) {
// 				localStorage.removeItem("accessToken");
// 				setCurrentUser(null);
// 			}
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	}, []);

// 	const checkCurrentUser = useCallback(async (force = false) => {
// 		const token = localStorage.getItem("accessToken");
// 		const now = Date.now();
// 		if (checkingUserRef.current) {
// 			console.log("Already checking user, skipping");
// 			return;
// 		}
// 		if (token && (force || now - lastCheckedRef.current > 5 * 60 * 1000)) {
// 			checkingUserRef.current = true;
// 			try {
// 				const response = await axiosInstance.get("/api/users/me");
// 				setCurrentUser(response.data);
// 				lastCheckedRef.current = now;
// 			} catch (error) {
// 				console.error("Failed to fetch current user:", error);
// 				localStorage.removeItem("accessToken");
// 				localStorage.removeItem("refreshToken");
// 				setCurrentUser(null);
// 			} finally {
// 				checkingUserRef.current = false;
// 			}
// 		}
// 	}, []);

// 	const login = useCallback(
// 		async (email, password) => {
// 			try {
// 				const response = await axiosInstance.post("/api/users/login", {
// 					email,
// 					password,
// 				});
// 				const { accessToken, refreshToken } = response.data;
// 				localStorage.setItem("accessToken", accessToken);
// 				localStorage.setItem("refreshToken", refreshToken);
// 				await checkCurrentUser(true);
// 				return true;
// 			} catch (error) {
// 				console.error(
// 					"Login failed:",
// 					error.response?.data?.message || error.message
// 				);
// 				return false;
// 			}
// 		},
// 		[checkCurrentUser]
// 	);

// 	// const logout = useCallback(() => {
// 	// 	localStorage.removeItem("accessToken");
// 	// 	setCurrentUser(null);
// 	// 	setUserList([]);
// 	// 	lastCheckedRef.current = 0;
// 	// }, []);

// 	const logout = useCallback(async () => {
// 		try {
// 			// Call the server-side logout endpoint
// 			await axiosInstance.post("/api/users/logout");

// 			// Proceed with client-side logout
// 			localStorage.removeItem("accessToken");
// 			setCurrentUser(null);
// 			setUserList([]);
// 			lastCheckedRef.current = 0;

// 			console.log("Logout successful");
// 		} catch (error) {
// 			console.error("Logout failed:", error);
// 			// Even if server-side logout fails, proceed with client-side logout
// 			localStorage.removeItem("accessToken");
// 			setCurrentUser(null);
// 			setUserList([]);
// 			lastCheckedRef.current = 0;
// 		}
// 	}, []);
// 	useEffect(() => {
// 		const token = localStorage.getItem("accessToken");
// 		if (token) {
// 			checkCurrentUser(true);
// 		}
// 	}, [checkCurrentUser]);

// 	const contextValue = useMemo(
// 		() => ({
// 			userList,
// 			getUsers,
// 			isLoading,
// 			currentUser,
// 			checkCurrentUser,
// 			login,
// 			logout,
// 		}),
// 		[
// 			userList,
// 			getUsers,
// 			isLoading,
// 			currentUser,
// 			checkCurrentUser,
// 			login,
// 			logout,
// 		]
// 	);

// 	return (
// 		<UserContext.Provider value={contextValue}>
// 			{children}
// 		</UserContext.Provider>
// 	);
// }

// export default UserContextProvider;

import React, {
	useState,
	useMemo,
	useEffect,
	useCallback,
	useRef,
} from "react";
import axiosInstance from "../../axiosInterceptor";
import UserContext from "./UserContext";

function UserContextProvider({ children }) {
	const [userList, setUserList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const lastCheckedRef = useRef(0);
	const checkingUserRef = useRef(false);

	const getUsers = useCallback(async () => {
		const token = localStorage.getItem("accessToken");
		if (!token) {
			console.log("No token found, skipping user fetch");
			return;
		}
		console.log("Starting to get users");
		setIsLoading(true);
		try {
			const response = await axiosInstance.get("/api/users");
			setUserList(response.data);
		} catch (error) {
			console.error("Failed to fetch users:", error);
			if (error.response && error.response.status === 401) {
				localStorage.removeItem("accessToken");
				setCurrentUser(null);
			}
		} finally {
			setIsLoading(false);
		}
	}, []);

	const checkCurrentUser = useCallback(async (force = false) => {
		const token = localStorage.getItem("accessToken");
		const now = Date.now();
		if (checkingUserRef.current) {
			console.log("Already checking user, skipping");
			return;
		}
		if (token && (force || now - lastCheckedRef.current > 5 * 60 * 1000)) {
			checkingUserRef.current = true;
			try {
				const response = await axiosInstance.get("/api/users/me");
				setCurrentUser(response.data);
				lastCheckedRef.current = now;
			} catch (error) {
				console.error("Failed to fetch current user:", error);
				if (error.response) {
					console.error("Error response:", error.response.data);
					console.error("Error status:", error.response.status);
				} else if (error.request) {
					console.error("No response received:", error.request);
				} else {
					console.error("Error setting up request:", error.message);
				}
				localStorage.removeItem("accessToken");
				setCurrentUser(null);
			} finally {
				checkingUserRef.current = false;
			}
		}
	}, []);

	const login = useCallback(
		async (email, password) => {
			try {
				const response = await axiosInstance.post("/api/users/login", {
					email,
					password,
				});
				const { accessToken } = response.data;
				localStorage.setItem("accessToken", accessToken);
				await checkCurrentUser(true);
				return true;
			} catch (error) {
				console.error(
					"Login failed:",
					error.response?.data?.message || error.message
				);
				return false;
			}
		},
		[checkCurrentUser]
	);

	const logout = useCallback(async () => {
		try {
			await axiosInstance.post("/api/users/logout");
		} catch (error) {
			console.error("Logout failed:", error);
		} finally {
			localStorage.removeItem("accessToken");
			setCurrentUser(null);
			setUserList([]);
			lastCheckedRef.current = 0;
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			checkCurrentUser(true);
		}
	}, [checkCurrentUser]);

	const contextValue = useMemo(
		() => ({
			userList,
			getUsers,
			isLoading,
			currentUser,
			checkCurrentUser,
			login,
			logout,
		}),
		[
			userList,
			getUsers,
			isLoading,
			currentUser,
			checkCurrentUser,
			login,
			logout,
		]
	);

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
