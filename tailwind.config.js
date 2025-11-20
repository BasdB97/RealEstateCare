export default {
	darkMode: ["selector", "[class~='dark']"],
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primarybg: "#161d21",
			},
		},
	},
	plugins: [],
};
