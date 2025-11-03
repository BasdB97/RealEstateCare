import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";
import path from "node:path";

export default defineConfig({
	plugins: [vue(), legacy()],
	resolve: {
		alias: {
			"@": path.resolve(process.cwd(), "src"),
		},
	},
	test: { globals: true, environment: "jsdom" },
});
