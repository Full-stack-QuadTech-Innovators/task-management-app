// import { Routes, Route } from "react-router-dom";
// import Login from "../pages/login/Login";
// import SignUp from "../pages/signup/SignUp";
// import HomePage from "../pages/homepage/HomePage";
// import About from "../pages/about/About";
// import Contact from "../pages/contact/Contact";
// import { Suspense } from "react";
// import RemoteRoutes from "./remoteRoutes";
// import NotFound from "../pages/not-found/NotFound";
// import UserProtectedRoutes from "../util/protected-routes/UserProtectedRoutes";
// function AppRoutes() {
// 	return (
// 		<Suspense fallback={<div>Loading...</div>}>
// 			<Routes>
// 				<Route path="*" element={<NotFound />} />
// 				<Route element={<UserProtectedRoutes />}>
// 					<Route path="/" element={<HomePage />} />
// 					<Route path="/home" element={<HomePage />} />
// 					<Route path="/*" element={<RemoteRoutes />} />
// 				</Route>
// 				<Route path="/login" element={<Login />} />
// 				<Route path="/signup" element={<SignUp />} />
// 				<Route path="/about" element={<About />} />
// 				<Route path="/contact" element={<Contact />} />
// 			</Routes>
// 		</Suspense>
// 	);
// }

// export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import SignUp from "../pages/signup/SignUp";
import HomePage from "../pages/homepage/HomePage";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import { Suspense } from "react";
import RemoteRoutes from "./remoteRoutes";
import NotFound from "../pages/not-found/NotFound";
import UserProtectedRoutes from "../util/protected-routes/UserProtectedRoutes";

function AppRoutes() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<SignUp />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />

				<Route element={<UserProtectedRoutes />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/home" element={<HomePage />} />
				</Route>
				<Route path="/chat/*" element={<RemoteRoutes />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Suspense>
	);
}

export default AppRoutes;
