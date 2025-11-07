import axios from "axios";

const api = axios.create({
	baseURL: import.meta.env.VITE_JSONBIN_BASE,
	timeout: 15000, // 15 seconds
	headers: {
		"Content-Type": "application/json",
	},
});

api.interceptors.request.use((config) => {
	const isLocalDev = config.baseURL?.includes("localhost");

	if (!isLocalDev) {
		// Only add API key for JSONBin.io, not for local json-server
		const encoded = import.meta.env.VITE_JSONBIN_X_MASTER_KEY_B64;
		if (encoded) {
			const key = atob(encoded);
			config.headers["X-Master-Key"] = key;
		}
		config.headers["X-Bin-Meta"] = false;
	}

	return config;
});

api.interceptors.response.use(
	(response) => {
		console.log("API Response success:", response.status);
		return response;
	},
	(error) => {
		console.error("API Response error:", {
			message: error.message,
			code: error.code,
			status: error.response?.status,
		});
		return Promise.reject(error);
	}
);

export default api;
