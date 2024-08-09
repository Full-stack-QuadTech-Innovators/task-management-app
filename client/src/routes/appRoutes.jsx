import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import HomePage from "../pages/homepage/HomePage";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import NotFound from "../pages/not-found/NotFound";
function AppRoutes() {
	return (
		<Routes>
			<Route path="*" element={<NotFound />} /> TBD
			<Route path="/" element={<HomePage />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/about" element={<About />} />
			<Route path="/contact" element={<Contact />} />
		</Routes>
	);
}

export default AppRoutes;
