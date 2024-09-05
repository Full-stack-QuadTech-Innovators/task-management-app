import React, { useState, useEffect, useCallback } from "react";
import io, { Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { ChatMessage } from "./types";
import chatAxiosInstance from "../chatAxiosInstance";

type ChatProps = {
	roomId?: string;
};

interface User {
	_id: string;
	username: string;
	email: string;
}

const Chat: React.FC<ChatProps> = ({ roomId = "room-1" }) => {
	const [chatter, setChatter] = useState<string>("");
	const [socket, setSocket] = useState<typeof Socket | null>(null);
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
		const saved = localStorage.getItem("darkMode");
		return saved !== null ? JSON.parse(saved) : false;
	});
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
	}, [isDarkMode]);

	useEffect(() => {
		const fetchUser = async () => {
			const token = localStorage.getItem("accessToken");
			if (token) {
				try {
					const response = await chatAxiosInstance.get(
						"/api/users/me"
					);
					setUser(response.data);
					setChatter(response.data.username);
				} catch (error) {
					console.error("Error fetching user:", error);
					generateRandomUser();
				}
			} else {
				generateRandomUser();
			}
		};

		fetchUser();
	}, []);

	const generateRandomUser = () => {
		const randomId = uuidv4();
		setChatter(randomId);
	};

	useEffect(() => {
		if (chatter) {
			const newSocket = io("http://localhost:3009"); //TBD : update localhost to prod url
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
		}
	}, [roomId, chatter]);

	const sendMessage = useCallback(
		(message: string) => {
			if (socket && chatter) {
				const newMessage: ChatMessage = {
					userId: chatter,
					message,
					timestamp: new Date().toISOString(),
				};
				socket.emit("chat message", { ...newMessage, roomId });
			}
		},
		[socket, chatter, roomId]
	);

	const toggleDarkMode = () => setIsDarkMode((prev: boolean) => !prev);

	if (!chatter) {
		return <div>Loading...</div>;
	}

	return (
		<div
			className={`min-h-screen flex flex-col  ${
				isDarkMode
					? "bg-darkMode-background text-darkMode-foreground"
					: "bg-lightMode-background text-lightMode-foreground"
			}`}
		>
			<div className="flex justify-between items-center p-4">
				<h2 className="text-2xl  font-bold">Chat Room: {roomId}</h2>
				<div>
					<span className="mr-4">
						User: {user ? user.username : chatter}
					</span>
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
			</div>
			<div className="flex-grow overflow-hidden">
				<MessageList
					messages={messages}
					currentUserId={chatter}
					isDarkMode={isDarkMode}
				/>
			</div>
			<MessageInput onSendMessage={sendMessage} isDarkMode={isDarkMode} />
		</div>
	);
};

export default Chat;
