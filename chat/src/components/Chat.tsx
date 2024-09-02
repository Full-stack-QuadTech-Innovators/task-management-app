import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { ChatMessage } from "./types";

type ChatProps = {
	userId?: string;
	roomId?: string;
};

const Chat: React.FC<ChatProps> = ({ userId = "user1", roomId = "room1" }) => {
	const [socket, setSocket] = useState<typeof Socket | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const saved = localStorage.getItem("darkMode");
		return saved !== null ? JSON.parse(saved) : false;
	});
	// You should get these values from your authentication system or props

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	useEffect(() => {
		const newSocket = io("http://localhost:3009");
		setSocket(newSocket);

		newSocket.emit("join room", roomId);

		newSocket.on("chat message", (message: ChatMessage) => {
			setMessages((prevMessages) => {
				const messageExists = prevMessages.some(
					(msg) =>
						msg.userId === message.userId &&
						msg.message === message.message &&
						msg.timestamp === message.timestamp
				);

				if (!messageExists) {
					return [...prevMessages, message];
				}
				return prevMessages;
			});
		});

		return () => {
			newSocket.disconnect();
		};
	}, [roomId]);

	const sendMessage = useCallback(
		(message: string) => {
			if (socket) {
				const newMessage: ChatMessage = {
					userId,
					message,
					timestamp: new Date().toISOString(),
				};
				socket.emit("chat message", { ...newMessage, roomId });
			}
		},
		[socket, userId, roomId]
	);

	const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

	return (
		<div
			className={`min-h-screen flex flex-col ${
				isDarkMode
					? "bg-darkMode-background text-darkMode-foreground"
					: "bg-lightMode-background text-lightMode-foreground"
			}`}
		>
			<div className="flex justify-between items-center p-4">
				<h2 className="text-2xl font-bold">Chat Room: {roomId}</h2>
				<button
					onClick={toggleDarkMode}
					className={`px-4 py-2 rounded-md transition-colors duration-200 ${
						isDarkMode
							? "bg-darkMode-button hover:bg-darkMode-buttonHover"
							: "bg-lightMode-button hover:bg-lightMode-buttonHover"
					}`}
				>
					Toggle {isDarkMode ? "Light" : "Dark"} Mode
				</button>
			</div>
			<div className="flex-grow overflow-hidden">
				<MessageList
					messages={messages}
					currentUserId={userId}
					isDarkMode={isDarkMode}
				/>
			</div>
			<MessageInput onSendMessage={sendMessage} isDarkMode={isDarkMode} />
		</div>
	);
};

export default Chat;
