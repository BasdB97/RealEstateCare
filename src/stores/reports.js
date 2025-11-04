import { defineStore } from "pinia";
import api from "@/lib/axios";

export const useReportsStore = defineStore("reports", {
	state: () => ({
		reports: [],
		loading: false,
		error: null,
	}),

	getters: {
		assignedReports: (state) => state.reports.filter((r) => !r.completed),
		completedReports: (state) => state.reports.filter((r) => r.completed),
		getReportById: (state) => (id) => state.reports.find((r) => r.id === id),
	},

	actions: {
		async fetchReports() {
			this.loading = true;
			this.error = null;
			console.log("Fetching reports...");

			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				console.log("Base URL:", baseUrl);
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				console.log("Bin ID:", binId);
				console.log("Master key:", import.meta.env.VITE_JSONBIN_X_MASTER_KEY_B64);
				console.log("URL:", `${baseUrl}/${binId}`);
				const response = await api.get(`${baseUrl}/${binId}`);
				this.reports = Array.isArray(response.data.record) ? response.data.record.reports : [];
				console.log("Reports:", this.reports);
			} catch (err) {
				console.error("Error fetching reports:", err);
				this.error = "Er is een fout opgetreden bij het ophalen van de rapportages.";
			} finally {
				this.loading = false;
				console.log("Loading:", this.loading);
			}
		},
	},
});
