// import React from "react";
// import type { ChatMessage as ChatMessageType } from "./types";

// interface ChatMessageProps {
// 	message: ChatMessageType;
// 	isOwnMessage: boolean;
// 	isDarkMode: boolean;

// }

// const ChatMessage: React.FC<ChatMessageProps> = ({
// 	message,
// 	isOwnMessage,
// 	isDarkMode,

// }) => {
// 	const formatTimestamp = (timestamp: string | Date) => {
// 		const date =
// 			timestamp instanceof Date ? timestamp : new Date(timestamp);
// 		return date.toLocaleTimeString();
// 	};

// 	return (
// 		<div className={`mb-4 ${isOwnMessage ? "text-right" : "text-left"}`}>
// 			<div
// 				className={`inline-block p-3 rounded-lg max-w-[70%] ${
// 					isOwnMessage
// 						? isDarkMode
// 							? "bg-darkMode-topTask text-darkMode-foreground"
// 							: "bg-lightMode-topTask text-lightMode-foreground"
// 						: isDarkMode
// 						? "bg-darkMode-normalTask text-darkMode-foreground"
// 						: "bg-lightMode-normalTask text-lightMode-foreground"
// 				}`}
// 			>
// 				<p className="text-black">{}</p>
// 				<p className="break-words">{message.message}</p>
// 				<span
// 					className={`text-xs opacity-75 block mt-1 ${
// 						isDarkMode
// 							? "text-darkMode-foreground"
// 							: "text-lightMode-foreground"
// 					}`}
// 				>
// 					{formatTimestamp(message.timestamp)}
// 				</span>
// 			</div>
// 		</div>
// 	);
// };

// export default ChatMessage;

import React from "react";
import type { ChatMessage as ChatMessageType } from "./types";

interface ChatMessageProps {
	message: ChatMessageType;
	isOwnMessage: boolean;
	isDarkMode: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
	message,
	isOwnMessage,
	isDarkMode,
}) => {
	const formatTimestamp = (timestamp: string | Date) => {
		const date =
			timestamp instanceof Date ? timestamp : new Date(timestamp);
		return date.toLocaleTimeString();
	};

	return (
		<div className={`mb-4 ${isOwnMessage ? "text-right" : "text-left"}`}>
			<div
				className={`inline-block p-3 rounded-lg max-w-[70%] ${
					isOwnMessage
						? isDarkMode
							? "bg-darkMode-topTask text-darkMode-foreground"
							: "bg-lightMode-topTask text-lightMode-foreground"
						: isDarkMode
						? "bg-darkMode-normalTask text-darkMode-foreground"
						: "bg-lightMode-normalTask text-lightMode-foreground"
				}`}
			>
				<p
					className={`text-2xs font-bold mb-2 ${
						isDarkMode
							? "text-darkMode-foreground"
							: "text-lightMode-foreground"
					}`}
				>
					{message.userId}
				</p>
				<p className="break-words">{message.message}</p>
				<span
					className={`text-xs opacity-75 block mt-1 ${
						isDarkMode
							? "text-darkMode-foreground"
							: "text-lightMode-foreground"
					}`}
				>
					{formatTimestamp(message.timestamp)}
				</span>
			</div>
		</div>
	);
};

export default ChatMessage;
