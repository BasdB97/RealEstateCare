import axios from "axios";

const API_URL = "https://my-json-server.typicode.com/BasdB97/RealEstateCare";

export const apiService = {
	async getAddresses() {
		try {
			const response = await axios.get(`${API_URL}/addresses`);
			return response.data;
		} catch (error) {
			throw new Error("Failed to fetch addresses: " + error.message);
		}
	},

	async getReports() {
		try {
			const response = await axios.get(`${API_URL}/reports`);
			return response.data;
		} catch (error) {
			throw new Error("Failed to fetch reports: " + error.message);
		}
	},
};
