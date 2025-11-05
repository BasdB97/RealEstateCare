import { defineStore } from "pinia";
import api from "@/lib/axios";

const normalizeDate = (date) => {
	if (!date) return null;
	if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
	const d = new Date(date);
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
		d.getDate()
	).padStart(2, "0")}`;
};

export const useReportsStore = defineStore("reports", {
	state: () => ({
		reports: [],
		loading: false,
		error: null,
	}),

	getters: {
		assignedReports: (s) => (s.reports ?? []).filter((r) => !r.completed),
		completedReports: (state) => (state.reports ?? []).filter((r) => r.completed),
		getReportById: (state) => (id) => (state.reports ?? []).find((r) => r.id === id),
	},

	actions: {
		async fetchReports() {
			this.loading = true;
			this.error = null;
			console.log("Fetching reports...");

			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				const response = await api.get(`${baseUrl}/${binId}`);
				console.log("Response:", response);
				this.reports = Array.isArray(response.data.record) ? response.data.record : [];
				console.log("Reports:", this.reports);
			} catch (err) {
				console.error("Error fetching reports:", err);
				this.error = "Er is een fout opgetreden bij het ophalen van de rapportages.";
			} finally {
				this.loading = false;
				console.log("Loading:", this.loading);
			}
		},

		async updateInspection(reportId, updated) {
			if (!updated?.id || !updated?.type) throw new Error("ID ontbreekt of type is ongeldig");
			const original = this.getReportById(reportId);
			if (!original) {
				throw new Error(`Report met ID ${reportId} niet gevonden`);
			}
			const nextReport = {
				...original,
				inspections: original.inspections.map((i) =>
					i.id === updated.id && i.type === updated.type
						? { ...i, ...updated, date: normalizeDate(updated.date) }
						: i
				),
			};
			this.reports = this.reports.map((r) => (r.id === reportId ? nextReport : r));

			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				await api.put(`${baseUrl}/${binId}`, this.reports);
			} catch (err) {
				console.error("Error updating inspection:", err);
				this.reports = this.reports.map((r) => (r.id === reportId ? original : r));
				this.error = "Er is een fout opgetreden bij het opslaan van de inspectie.";
				throw err;
			}
		},
	},
});
