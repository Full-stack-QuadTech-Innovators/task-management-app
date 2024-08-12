import UserContext from "./UserContext";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

const api = axios.create({
	baseURL: "http://localhost:3009",
});

function UserContextProvider({ children }) {
	const [userList, setUserList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	// const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		getUsers();
	}, []);

	async function getUsers() {
		console.log("starting to get users");

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

	// async function login(credentials) {
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await api.post("/api/login", credentials);
	// 		setCurrentUser(response.data.user);
	// 		localStorage.setItem(
	// 			"currentUser",
	// 			JSON.stringify(response.data.user)
	// 		);
	// 	} catch (error) {
	// 		console.error("Login failed:", error);
	// 		throw error;
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// }

	// function logout() {
	// 	setCurrentUser(null);
	// 	localStorage.removeItem("currentUser");
	// }

	const contextValue = useMemo(
		() => ({
			userList,
			getUsers,
			isLoading,
		}),
		[userList, isLoading]
	);

	return (
		<UserContext.Provider value={contextValue}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContextProvider;
