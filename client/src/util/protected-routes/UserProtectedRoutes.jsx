import { Outlet, Navigate } from "react-router-dom";
// import UserContext from "../../contexts/userContext";
import { useContext } from "react";

export default function UserProtectedRoutes() {
	//TBD: Add authentication for users.
	// const { users, loggedIn } = useContext(UserContext);

	// const isLoggedIn = loggedIn && Object.keys(loggedIn).length > 0;
	// const currentUser = isLoggedIn
	// 	? users.find((user) => user.uuid === loggedIn.uuid)
	// 	: null;
	const currentUser = true;

	return currentUser ? <Outlet /> : <Navigate to="/login/" />;
}
