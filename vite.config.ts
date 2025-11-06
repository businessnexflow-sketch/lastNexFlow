import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
	plugins: [
		react(),
		// Replit plugins only for development (lazy loaded when REPL environment is detected)
		...(process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined
			? [
				// Avoid top-level await by dynamic import inside config evaluation
			]
			: []),
	],
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "client", "src"),
			"@shared": path.resolve(import.meta.dirname, "shared"),
			"@assets": path.resolve(import.meta.dirname, "attached_assets"),
		},
	},
	root: path.resolve(import.meta.dirname, "client"),
	build: {
		outDir: path.resolve(import.meta.dirname, "dist/public"),
		emptyOutDir: true,
		rollupOptions: {
			input: {
				main: path.resolve(import.meta.dirname, "client", "index.html"),
			},
		},
	},
	define: {
		'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
	},
	server: {
		fs: {
			strict: true,
			deny: ["**/.*"],
		},
	},
});
