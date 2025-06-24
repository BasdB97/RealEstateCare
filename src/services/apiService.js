import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://my-json-server.typicode.com/BasdB97/RealEstateCare",
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

export const apiService = {
	async getReports() {
		try {
			console.log(`Fetching ${apiClient.defaults.baseURL}/reports`);
			const response = await apiClient.get("/reports");
			return response.data;
		} catch (error) {
			console.error("Error fetching reports:", {
				message: error.message,
				status: error.response?.status,
				data: error.response?.data,
			});
			throw new Error(`Failed to fetch reports: ${error.message}`);
		}
	},
};
