import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import HomePage from "../pages/homepage/HomePage";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import NotFound from "../pages/not-found/NotFound";
import UserProtectedRoutes from "../util/protected-routes/UserProtectedRoutes";
function AppRoutes() {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} />
			<Route element={<UserProtectedRoutes />}>
				<Route path="/" element={<HomePage />} />
			</Route>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
		</Routes>
	);
}

export default AppRoutes;
