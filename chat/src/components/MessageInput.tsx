import React, { useState } from "react";

interface MessageInputProps {
	onSendMessage: (message: string) => void;
	isDarkMode: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
	onSendMessage,
	isDarkMode,
}) => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (message.trim()) {
			onSendMessage(message);
			setMessage("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="p-4">
			<div className="flex">
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="Type a message..."
					className={`flex-grow p-2 rounded-l-lg focus:outline-none ${
						isDarkMode
							? "bg-darkMode-containerBlack text-black border border-gray-600"
							: "bg-white text-black border border-gray-300"
					}`}
				/>
				<button
					type="submit"
					className={`px-4 py-2 rounded-r-lg transition-colors duration-200 ${
						isDarkMode
							? "bg-darkMode-button hover:bg-darkMode-buttonHover text-white"
							: "bg-lightMode-button hover:bg-lightMode-buttonHover text-lightMode-foreground"
					}`}
				>
					Send
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
