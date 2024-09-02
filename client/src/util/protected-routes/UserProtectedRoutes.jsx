// export default function UserProtectedRoutes() {
// 	const { currentUser, checkCurrentUser } = useContext(UserContext);
// 	const [isLoading, setIsLoading] = useState(true);

// 	useEffect(() => {
// 		const verifyUser = async () => {
// 			await checkCurrentUser();
// 			setIsLoading(false);
// 		};
// 		verifyUser();
// 	}, [checkCurrentUser]);

// 	if (isLoading) {
// 		return <div>Loading...</div>; // Or a loading spinner
// 	}

// 	return currentUser ? <Outlet /> : <Navigate to="/login/" />;
// }

// import { Outlet, Navigate, useLocation } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import UserContext from "../../contexts/UserContext/UserContext";

// export default function UserProtectedRoutes() {
// 	const { currentUser, checkCurrentUser } = useContext(UserContext);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const location = useLocation();

// 	useEffect(() => {
// 		const verifyUser = async () => {
// 			try {
// 				await checkCurrentUser();
// 			} catch (error) {
// 				console.error("Error verifying user:", error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};
// 		verifyUser();
// 	}, [checkCurrentUser]);

// 	if (isLoading) {
// 		return <div>Verifying user...</div>; // Or a loading spinner
// 	}

// 	if (!currentUser) {
// 		// Redirect to login page, but save the location they were trying to access
// 		return <Navigate to="/login" state={{ from: location }} replace />;
// 	}

// 	return <Outlet />;
// }

import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext/UserContext";

export default function UserProtectedRoutes() {
	const { currentUser, checkCurrentUser } = useContext(UserContext);
	const [isVerifying, setIsVerifying] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const verifyUser = async () => {
			setIsVerifying(true);
			try {
				await checkCurrentUser(true);
			} catch (error) {
				console.error("Error verifying user:", error);
			} finally {
				setIsVerifying(false);
			}
		};

		verifyUser();
	}, [checkCurrentUser]);

	if (isVerifying) {
		return <div>Verifying user...</div>;
	}

	if (!currentUser) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return <Outlet />;
}
