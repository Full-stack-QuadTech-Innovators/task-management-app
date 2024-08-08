import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
function AppRoutes() {
	return (
		<Routes>
			{/* <Route path="*" element={<NotFound />} /> TBD*/}
			{/* <Route path="/" element={<HomePage />} /> TBD */}

			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default AppRoutes;
