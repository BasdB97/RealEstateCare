import axios from "axios";

const API_BASE_URL = "https://my-json-server.typicode.com/BasdB97/RealEstateCare";

export const apiService = {
	async getAddresses() {
		try {
			const response = await axios.get(`${API_BASE_URL}/inspections`);
			return response.data;
		} catch (error) {
			throw new Error("Failed to fetch addresses: " + error.message);
		}
	},
};
