// In your RemoteRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
const Chat = React.lazy(() => import("../../../chat/src/App"));

function RemoteRoutes() {
	console.log("RemoteRoutes rendered");
	return (
		<React.Suspense fallback={<div>Loading Chat...</div>}>
			<Routes>
				<Route path="*" element={<Chat />} />
			</Routes>
		</React.Suspense>
	);
}

export default RemoteRoutes;
