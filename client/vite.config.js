import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
	plugins: [
		react(),
		federation({
			name: "main-app",
			remotes: {
				chatMFE: "http://localhost:5174/assets/remoteEntry.js", // Adjust port if needed
			},
			shared: ["react", "react-dom"],
		}),
	],
});
