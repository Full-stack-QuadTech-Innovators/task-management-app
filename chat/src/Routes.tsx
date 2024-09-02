import { Routes, Route } from "react-router-dom";
import Chat from "./components/Chat";

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Chat />} />
		</Routes>
	);
}

export default AppRoutes;
