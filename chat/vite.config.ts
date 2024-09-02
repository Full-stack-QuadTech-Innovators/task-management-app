// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import pkg from "./package.json";

export default defineConfig({
	base: "/chat",
	plugins: [
		react(),
		federation({
			name: "chat",
			filename: "remoteEntry.js",
			exposes: {
				"./App": "./src/App",
			},
			shared: { ...pkg.dependencies },
		}),
	],
	build: {
		target: "esnext",
	},
});
