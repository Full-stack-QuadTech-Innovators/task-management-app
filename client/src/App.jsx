import "./App.css";
import Login from "./pages/login/Login";
import ThemeContextProvider from "./contexts/ThemeContext/ThemeContextProvider";
import AppRoutes from "./routes/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
export default function App() {
	return (
		<ThemeContextProvider>
			<Router>
				<AppRoutes>
					<Login />
				</AppRoutes>
			</Router>
		</ThemeContextProvider>
	);
}
