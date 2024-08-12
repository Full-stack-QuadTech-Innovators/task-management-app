import "./App.css";
import Login from "./pages/login/Login";
import ThemeContextProvider from "./contexts/ThemeContext/ThemeContextProvider";
import UserContextProvider from "./contexts/UserContext/UserContextProvider";
import AppRoutes from "./routes/appRoutes";
import { BrowserRouter as Router } from "react-router-dom";
export default function App() {
	return (
		<ThemeContextProvider>
			<UserContextProvider>
				<Router>
					<AppRoutes>
						<Login />
					</AppRoutes>
				</Router>
			</UserContextProvider>
		</ThemeContextProvider>
	);
}
