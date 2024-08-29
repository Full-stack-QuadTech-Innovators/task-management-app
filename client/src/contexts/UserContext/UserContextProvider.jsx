// import React, { useState, useMemo, useEffect, useCallback } from "react";
// import UserContext from "./UserContext";
// import axios from "axios";

// const api = axios.create({
// 	baseURL: "http://localhost:3009",
// });

// api.interceptors.request.use(
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
// 	const [lastChecked, setLastChecked] = useState(0);

// 	const getUsers = useCallback(async () => {
// 		const token = localStorage.getItem("accessToken");
// 		if (!token) {
// 			console.log("No token found, skipping user fetch");
// 			return;
// 		}
// 		console.log("starting to get users");
// 		setIsLoading(true);
// 		try {
// 			const response = await api.get("/api/users");
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

// 	const checkCurrentUser = useCallback(
// 		async (force = false) => {
// 			const token = localStorage.getItem("accessToken");
// 			const now = Date.now();
// 			if (token && (force || now - lastChecked > 5 * 60 * 1000)) {
// 				try {
// 					const response = await api.get("/api/users/me");
// 					setCurrentUser(response.data);
// 					setLastChecked(now);
// 				} catch (error) {
// 					console.error("Failed to fetch current user:", error);
// 					localStorage.removeItem("accessToken");
// 					setCurrentUser(null);
// 				}
// 			}
// 		},
// 		[lastChecked]
// 	);

// 	const login = useCallback(
// 		async (email, password) => {
// 			try {
// 				const response = await api.post("/api/users/login", {
// 					email,
// 					password,
// 				});
// 				const { accessToken } = response.data;
// 				localStorage.setItem("accessToken", accessToken);
// 				await checkCurrentUser(true);
// 				console.log("Login successful, currentUser set:", currentUser);
// 				return true;
// 			} catch (error) {
// 				console.error(
// 					"Login failed:",
// 					error.response?.data?.message || error.message
// 				);
// 				return false;
// 			}
// 		},
// 		[checkCurrentUser, currentUser]
// 	);

// 	const logout = useCallback(() => {
// 		localStorage.removeItem("accessToken");
// 		setCurrentUser(null);
// 		setUserList([]);
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
import UserContext from "./UserContext";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3009",
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers["Authorization"] = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

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
		console.log("starting to get users");
		setIsLoading(true);
		try {
			const response = await api.get("/api/users");
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
				const response = await api.get("/api/users/me");
				setCurrentUser(response.data);
				lastCheckedRef.current = now;
			} catch (error) {
				console.error("Failed to fetch current user:", error);
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
				const response = await api.post("/api/users/login", {
					email,
					password,
				});
				const { accessToken } = response.data;
				localStorage.setItem("accessToken", accessToken);
				await checkCurrentUser(true);
				console.log("Login successful, currentUser set:", currentUser);
				return true;
			} catch (error) {
				console.error(
					"Login failed:",
					error.response?.data?.message || error.message
				);
				return false;
			}
		},
		[checkCurrentUser, currentUser]
	);

	// const logout = useCallback(() => {
	// 	localStorage.removeItem("accessToken");
	// 	setCurrentUser(null);
	// 	setUserList([]);
	// 	lastCheckedRef.current = 0;
	// }, []);

	const logout = useCallback(async () => {
		try {
			// Call the server-side logout endpoint
			await api.post("/api/users/logout");

			// Proceed with client-side logout
			localStorage.removeItem("accessToken");
			setCurrentUser(null);
			setUserList([]);
			lastCheckedRef.current = 0;

			console.log("Logout successful");
		} catch (error) {
			console.error("Logout failed:", error);
			// Even if server-side logout fails, proceed with client-side logout
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
