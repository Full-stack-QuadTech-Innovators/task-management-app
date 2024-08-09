import Logo from "../../../assets/logo.svg";
function LogoComponent() {
	return (
		<div className="flex items-center">
			<img src={Logo} alt="Logo" className="h-8 mr-2" />
			<h1 className="text-2xl font-bold text-gray-900 dark:text-white">
				Petal Notes
			</h1>
		</div>
	);
}

export default LogoComponent;
