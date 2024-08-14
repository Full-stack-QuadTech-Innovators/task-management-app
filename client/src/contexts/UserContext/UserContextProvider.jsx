import UserContext from "./UserContext";
import { useState, useMemo, useEffect } from "react";
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

	useEffect(() => {
		checkCurrentUser();
	}, []);

	async function getUsers() {
		setIsLoading(true);
		try {
			const response = await api.get("/api/users");
			setUserList(response.data);
		} catch (error) {
			console.error("Failed to fetch users:", error);
			throw error;
		} finally {
			setIsLoading(false);
		}
	}

	async function checkCurrentUser() {
		const token = localStorage.getItem("accessToken");
		if (token) {
			try {
				const response = await api.get("/api/users/me");
				setCurrentUser(response.data);
			} catch (error) {
				console.error("Failed to fetch current user:", error);
				localStorage.removeItem("accessToken");
				setCurrentUser(null);
			}
		}
	}

	async function login(email, password) {
		try {
			const response = await api.post("/api/users/login", {
				email,
				password,
			});
			const { accessToken, user } = response.data;
			localStorage.setItem("accessToken", accessToken);
			setCurrentUser(user);
			return user; // Return the user data
		} catch (error) {
			console.error("Login failed:", error);
			throw error;
		}
	}

	async function logout() {
		localStorage.removeItem("accessToken");
		setCurrentUser(null);
	}

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
		[userList, isLoading, currentUser]
	);

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
