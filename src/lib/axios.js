import axios from "axios";

// Axios API voor de JSONBin API
const api = axios.create({
	baseURL: "https://api.jsonbin.io/v3/b",
	timeout: 15000, // 15 seconds
	headers: {
		"X-Master-Key": "$2a$10$NUaYzbl3tlDKZ7Iw2oYwY.JcWt88FEwuEwvHS9D838F2Dcw6lk3J.",
		"Content-Type": "application/json",
	},
});

// Interceptor voor de API response
api.interceptors.response.use(
	(response) => {
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
