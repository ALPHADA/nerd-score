// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 👉 여기 'nerd-score'는 너 GitHub repo 이름으로 바꿔줘
export default defineConfig({
	base: "/nerd-score/",
	plugins: [react()],
});
