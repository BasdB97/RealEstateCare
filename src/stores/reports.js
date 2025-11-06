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
		dirtyReports: {},
	}),

	getters: {
		assignedReports: (s) => (s.reports ?? []).filter((r) => !r.completed),
		completedReports: (state) => (state.reports ?? []).filter((r) => r.completed),
		getReportById: (state) => (id) => (state.reports ?? []).find((r) => r.id === id),
	},

	actions: {
		//
		_saveLocalCache() {
			localStorage.setItem("reports-cache", JSON.stringify(this.reports));
			localStorage.setItem("reports-dirty", JSON.stringify(this.dirtyReports));
		},
		hydrateFromCache() {
			const cache = localStorage.getItem("reports-cache");
			const dirty = localStorage.getItem("reports-dirty");
			if (cache) this.reports = JSON.parse(cache);
			if (dirty) this.dirtyReports = JSON.parse(dirty);
		},
		async fetchReports() {
			this.loading = true;
			this.error = null;
			console.log("Fetching reports...");

			try {
				this.hydrateFromCache();
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				const response = await api.get(`${baseUrl}/${binId}`);
				console.log("Response:", response);
				this.reports = Array.isArray(response.data.record.reports)
					? response.data.record.reports
					: [];
				console.log("Reports:", this.reports);
			} catch (err) {
				console.error("Error fetching reports:", err);
				(this.error = "Er is een fout opgetreden bij het ophalen van de rapportages."), err;
			} finally {
				this.loading = false;
				console.log("Loading:", this.loading);
			}
		},

		// Store inspection in local cache
		updateInspectionLocal(reportId, updated) {
			// Validate input
			if (!updated?.id || !updated?.type) throw new Error("ID of type ontbreekt"); //
			// Get report by id from store and check if it exists
			const report = this.getReportById(reportId);
			if (!report) throw new Error(`Report ${reportId} niet gevonden`);

			// if inspection id and type match, update the inspection, otherwise keep the original inspection
			report.inspections = report.inspections.map((i) =>
				i.id === updated.id && i.type === updated.type
					? { ...i, ...updated, date: normalizeDate(updated.date) }
					: i
			);

			// Mark as local changed
			this.dirtyReports[reportId] = true;
			// Save cache to localStorage
			this._saveLocalCache();
		},

		// Send report to server (either completed or not)
		async persistReportWithStatus(reportId, completed) {
			const idx = this.reports.findIndex((r) => r.id === reportId);
			if (idx === -1) throw new Error(`Report ${reportId} niet gevonden`);

			const original = this.reports[idx];
			const next = { ...original, completed };

			// optimistic update + cache
			this.reports = this.reports.map((r) => (r.id === reportId ? next : r));
			this._saveLocalCache();

			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				const response = await api.put(`${baseUrl}/${binId}`, { reports: this.reports });
				delete this.dirtyReports[reportId];
				this._saveLocalCache();
				return response;
			} catch (err) {
				// rollback
				this.reports = this.reports.map((r) => (r.id === reportId ? original : r));
				this._saveLocalCache();
				this.error = completed ? "Opslaan & afronden mislukt" : "Opslaan mislukt";
				throw err;
			}
		},
	},
});
