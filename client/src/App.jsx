import "./App.css";
import Login from "./pages/login/Login";
import ThemeContextProvider from "./contexts/ThemeContext/ThemeContextProvider";
import ToggleThemeButton from "./components/common/theme-button/ToggleThemeButton";
export default function App() {
	return (
		<ThemeContextProvider>
			<Login />
		</ThemeContextProvider>
	);
}
