import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../contexts/ThemeContext/ThemeContext";
import UserContext from "../../contexts/UserContext/UserContext";
import Header from "../../components/common/header/Header";
import Label from "../../components/common/label/Label";
import ContinueButton from "../../components/common/submit-button/ContinueButton";
import axios from "axios";
import { validateSignUpForm } from "../../util/signup.auth";

const api = axios.create({
	baseURL: "http://localhost:3009", // Replace with your backend URL
});

const SignUp = () => {
	const { userList, getUsers } = useContext(UserContext);
	const navigate = useNavigate();
	const { isDarkMode } = useContext(ThemeContext);
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});

	useEffect(() => {
		document.title = "Patel Notes | Sign Up";
		console.log(userList);
	}, [userList]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateSignUpForm(formData, setErrors, userList)) {
			console.error("validation failed");
			return; // Stop if validation fails
		}
		if (formData.password !== formData.confirmPassword) {
			setErrors({ ...errors, confirmPassword: "Passwords don't match" });
			return;
		}
		try {
			const response = await api.post("/api/users", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			console.log("User created:", response.data);
			navigate("/login");
		} catch (err) {
			setErrors({
				...errors,
				general: err.response?.data?.message || "An error occurred",
			});
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
					<h2 className="text-2xl text-center">Sign Up</h2>
					<form className="space-y-6" onSubmit={handleSubmit}>
						<div>
							<Label value="Username" className="mb-2" />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								name="username"
								type="text"
								value={formData.username}
								onChange={handleChange}
								required
							/>
							{errors.username && (
								<p className="error text-red-500">
									{errors.username}
								</p>
							)}
						</div>
						<div>
							<Label value="Email" className="mb-2" />
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
							{errors.email && (
								<p className="error text-red-500">
									{errors.email}
								</p>
							)}
						</div>
						<div>
							<Label value="Password" className="mb-2" />
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
							{errors.password && (
								<p className="error text-red-500">
									{errors.password}
								</p>
							)}
						</div>
						<div>
							<Label value="Confirm Password" className="mb-2" />
							<input
								className={`w-full px-4 py-2 text-base border-b-2 border-black ${
									isDarkMode
										? "bg-darkMode-background text-darkMode-foreground"
										: "bg-lightMode-background text-lightMode-foreground"
								} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md`}
								name="confirmPassword"
								type="password"
								value={formData.confirmPassword}
								onChange={handleChange}
								required
							/>
							{errors.confirmPassword && (
								<p className="error text-red-500">
									{errors.confirmPassword}
								</p>
							)}
						</div>
						{errors.general && (
							<p className="error text-red-500">
								{errors.general}
							</p>
						)}
						<div className="flex items-center justify-between">
							<ContinueButton
								text="Sign Up"
								type="submit"
								onClick={handleSubmit}
								disabled={false}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
