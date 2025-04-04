/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				pretendard: ["Pretendard", "sans-serif"],
			},
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/aspect-ratio"), require("@tailwindcss/typography")],
};
