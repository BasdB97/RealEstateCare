import axios from "axios";

const API_BASE_URL = "https://my-json-server.typicode.com/BasdB97/RealEstateCare";

export const apiService = {
	async getReports() {
		try {
			console.log(`Fetching ${API_BASE_URL}/reports`);
			const response = await axios.get(`${API_BASE_URL}/reports`);
			return response.data;
		} catch (error) {
			console.error(`Error fetching reports:`, error);
			throw new Error(`Failed to fetch reports: ${error.message}`);
		}
	},
};
