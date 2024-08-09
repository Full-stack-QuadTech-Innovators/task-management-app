import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import HomePage from "../pages/homepage/HomePage";
function AppRoutes() {
	return (
		<Routes>
			{/* <Route path="*" element={<NotFound />} /> TBD*/}
			{/* <Route path="/" element={<HomePage />} /> TBD */}

			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
		</Routes>
	);
}

export default AppRoutes;
