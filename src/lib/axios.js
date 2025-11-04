import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_JSONBIN_BASE,
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const encoded = import.meta.env.VITE_JSONBIN_X_MASTER_KEY_B64;
	if (encoded) {
		const key = atob(encoded);
		config.headers["X-Master-Key"] = key;
	}
	config.headers["X-Bin-Meta"] = false;
	return config;
});

export default api;
