// import React, { useContext, useEffect, useState } from "react";
// import Header from "../../components/common/header/Header";
// import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
// import ContinueButton from "../../components/common/submit-button/ContinueButton";
// import Label from "../../components/common/label/Label";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import UserContext from "../../contexts/UserContext/UserContext";
// const api = axios.create({
// 	baseURL: "http://localhost:3009", // Replace with your backend URL
// });

// const Login = () => {
// 	const navigate = useNavigate();
// 	const { isDarkMode } = useContext(ThemeContext);
// 	const [loading, setLoading] = useState(false);
// 	const { login, currentUser } = useContext(UserContext);

// 	const [formData, setFormData] = useState({
// 		email: "",
// 		password: "",
// 	});
// 	const [errors, setErrors] = useState({});
// 	useEffect(() => {
// 		document.title = "Patel Notes | Login";
// 	}, []);
// 	useEffect(() => {
// 		if (currentUser) {
// 			navigate("/");
// 		}
// 	}, [currentUser, navigate]);
// 	const handleChange = (e) => {
// 		setFormData({ ...formData, [e.target.name]: e.target.value });
// 	};
// 	// const handleSubmit = async (e) => {
// 	// 	e.preventDefault();
// 	// 	setLoading(true);
// 	// 	try {
// 	// 		await login(formData.email, formData.password);
// 	// 		console.log("Login Successful, redirecting now");
// 	// 		navigate("/");
// 	// 	} catch (error) {
// 	// 		console.error(
// 	// 			"Login failed:",
// 	// 			error.response?.data?.message || error.message
// 	// 		);
// 	// 		setErrors({
// 	// 			general: error.response?.data?.message || "Login failed",
// 	// 		});
// 	// 	} finally {
// 	// 		setLoading(false);
// 	// 	}
// 	// };
// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		setLoading(true);
// 		try {
// 			const success = await login(formData.email, formData.password);
// 			if (success) {
// 				console.log("Login successful, waiting for navigation...");
// 			} else {
// 				setErrors({
// 					general: "Login failed. Please check your credentials.",
// 				});
// 			}
// 		} catch (error) {
// 			console.error("Login error:", error);
// 			setErrors({
// 				general: "An unexpected error occurred. Please try again.",
// 			});
// 		} finally {
// 			setLoading(false);
// 		}
// 	};
// 	return (
// 		<div
// 			className={
// 				isDarkMode
// 					? "bg-darkMode-background text-darkMode-foreground"
// 					: "bg-lightMode-background text-lightMode-foreground"
// 			}
// 		>
// 			<Header />
// 			<div className={`flex items-center justify-center min-h-screen`}>
// 				<div className="w-full max-w-md p-8 space-y-6">
// 					<h2 className="text-2xl text-center">Log In</h2>
// 					<form onSubmit={handleSubmit}>
// 						{errors.general && (
// 							<div className="text-red-500 mb-4">
// 								{errors.general}
// 							</div>
// 						)}
// 						<div className="mb-4">
// 							<Label value={"Email"} className="mb-2" />
// 							<input
// 								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
// 									isDarkMode
// 										? "bg-darkMode-background text-darkMode-foreground"
// 										: "bg-lightMode-background text-lightMode-foreground"
// 								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
// 								name="email"
// 								type="email"
// 								value={formData.email}
// 								onChange={handleChange}
// 								required
// 							/>
// 						</div>
// 						<div className="mb-6">
// 							<Label value={"Password"} className="mb-2" />
// 							<input
// 								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
// 									isDarkMode
// 										? "bg-darkMode-background text-darkMode-foreground"
// 										: "bg-lightMode-background text-lightMode-foreground"
// 								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
// 								name="password"
// 								type="password"
// 								value={formData.password}
// 								onChange={handleChange}
// 								required
// 							/>
// 						</div>
// 						<div className="flex items-center justify-between">
// 							<ContinueButton
// 								loading={loading}
// 								text="Log In"
// 								type="submit"
// 								disabled={!formData.email || !formData.password}
// 							/>
// 						</div>
// 					</form>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default Login;
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../../components/common/header/Header";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import UserContext from "../../contexts/UserContext/UserContext";
import ContinueButton from "../../components/common/submit-button/ContinueButton";
import Label from "../../components/common/label/Label";

const Login = () => {
	const navigate = useNavigate();
	const { isDarkMode } = useContext(ThemeContext);
	const [loading, setLoading] = useState(false);
	const { login, currentUser } = useContext(UserContext);

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		document.title = "Patel Notes | Login";
	}, []);

	useEffect(() => {
		if (currentUser) {
			navigate("/");
		}
	}, [currentUser, navigate]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const success = await login(formData.email, formData.password);
			if (success) {
				console.log("Login successful, waiting for navigation...");
			} else {
				setErrors({
					general: "Login failed. Please check your credentials.",
				});
			}
		} catch (error) {
			console.error("Login error:", error);
			setErrors({
				general: "An unexpected error occurred. Please try again.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className={
				isDarkMode
					? "bg-darkMode-background text-darkMode-foreground"
					: "bg-lightMode-background text-lightMode-foreground"
			}
		>
			<Header />
			<div className={`flex items-center justify-center min-h-screen`}>
				<div className="w-full max-w-md p-8 space-y-6">
					<h2 className="text-2xl text-center">Log In</h2>
					<form onSubmit={handleSubmit}>
						{errors.general && (
							<div className="text-red-500 mb-4">
								{errors.general}
							</div>
						)}
						<div className="mb-4">
							<Label value={"Email"} className="mb-2" />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								name="email"
								type="email"
								value={formData.email}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="mb-6">
							<Label value={"Password"} className="mb-2" />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								name="password"
								type="password"
								value={formData.password}
								onChange={handleChange}
								required
							/>
						</div>
						<div className="flex items-center justify-between">
							<ContinueButton
								loading={loading}
								text="Log In"
								type="submit"
								disabled={!formData.email || !formData.password}
							/>
						</div>
					</form>
					<div className="text-center mt-4">
						<p>
							Don't have an account?{" "}
							<Link
								to="/signup"
								className={`font-medium ${
									isDarkMode
										? "text-blue-400"
										: "text-blue-600"
								} hover:underline`}
							>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
