import { Outlet, Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext/UserContext";

export default function UserProtectedRoutes() {
	const { currentUser, checkCurrentUser } = useContext(UserContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const verifyUser = async () => {
			await checkCurrentUser();
			setIsLoading(false);
		};
		verifyUser();
	}, [checkCurrentUser]);

	if (isLoading) {
		return <div>Loading...</div>; // Or a loading spinner
	}

	return currentUser ? <Outlet /> : <Navigate to="/login/" />;
}
