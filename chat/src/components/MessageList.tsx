import React, { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "./types";

interface MessageListProps {
	messages: ChatMessageType[];
	currentUserId: string;
	isDarkMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
	messages,
	currentUserId,
	isDarkMode,
}) => {
	const messagesEndRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div
			className={`h-[calc(100vh-160px)] overflow-y-auto p-4 ${
				isDarkMode ? "bg-darkMode-containerBlack" : "bg-white"
			}`}
		>
			{messages.map((msg, index) => (
				<ChatMessage
					key={`${msg.userId}-${msg.timestamp}-${index}`}
					message={msg}
					isOwnMessage={msg.userId === currentUserId}
					isDarkMode={isDarkMode}
				/>
			))}
			<div ref={messagesEndRef} />
		</div>
	);
};

export default MessageList;
