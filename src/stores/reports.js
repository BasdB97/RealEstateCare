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
				this.error = "Er is een fout opgetreden bij het ophalen van de rapportages.";
			} finally {
				this.loading = false;
				console.log("Loading:", this.loading);
			}
		},

		updateInspectionLocal(reportId, updated) {
			if (updated?.id == null || !updated?.type) throw new Error("ID of type ontbreekt");
			const report = this.getReportById(reportId);
			if (!report) throw new Error(`Report ${reportId} niet gevonden`);

			report.inspections = report.inspections.map((i) =>
				i.id === updated.id && i.type === updated.type
					? { ...i, ...updated, date: normalizeDate(updated.date) }
					: i
			);

			this.dirtyReports[reportId] = true; // markeer lokaal gewijzigd
			this._saveLocalCache(); // cache naar localStorage
		},

		async persistReport(reportId) {
			const report = this.getReportById(reportId);
			if (!report) throw new Error(`Report ${reportId} niet gevonden`);

			// hier schrijf je 1 rapport weg; JSONBin heeft meestal 1 hele collectie nodig,
			// dus stuur desnoods this.reports als record.
			const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
			const binId = import.meta.env.VITE_JSONBIN_BIN_ID;

			await api.put(`${baseUrl}/${binId}`, { reports: this.reports });

			delete this.dirtyReports[reportId];
			this._saveLocalCache();
		},

		async persistAllDirty() {
			// eventueel per report wegschrijven; voor JSONBin vaak 1 call genoeg:
			const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
			const binId = import.meta.env.VITE_JSONBIN_BIN_ID;

			await api.put(`${baseUrl}/${binId}`, { reports: this.reports });

			this.dirtyReports = {};
			this._saveLocalCache();
		},

		async persistReportDraft(reportId) {
			const idx = this.reports.findIndex((r) => r.id === reportId);
			if (idx === -1) throw new Error(`Report ${reportId} niet gevonden`);

			// Zorg dat completed NIET verandert (forceer false voor draft-save)
			const draftReport = { ...this.reports[idx], completed: false };
			console.log("draftReport", draftReport);

			// Schrijf terug in state zodat UI klopt en cache consistent is
			this.reports = this.reports.map((r) => (r.id === reportId ? draftReport : r));
			console.log("this.reports", this.reports);
			this._saveLocalCache();
			// Stop executing code here

			// Persist hele collectie (JSONBin bewaart 1 bin met alle rapporten)
			const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
			const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
			await api.put(`${baseUrl}/${binId}`, { reports: this.reports });

			// Markeer als gesynct
			delete this.dirtyReports[reportId];
			this._saveLocalCache();
		},

		async persistReportComplete(reportId) {
			const idx = this.reports.findIndex((r) => r.id === reportId);
			if (idx === -1) throw new Error(`Report ${reportId} niet gevonden`);

			const original = this.reports[idx];
			const completedReport = { ...original, completed: true };

			// Optimistic update + cache
			this.reports = this.reports.map((r) => (r.id === reportId ? completedReport : r));
			this._saveLocalCache();

			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				await api.put(`${baseUrl}/${binId}`, { reports: this.reports });
				delete this.dirtyReports[reportId];
				this._saveLocalCache();
			} catch (e) {
				// rollback als sync faalt
				this.reports = this.reports.map((r) => (r.id === reportId ? original : r));
				this._saveLocalCache();
				this.error = "Opslaan & afronden mislukt (offline?)";
				throw e;
			}
		},
	},
});
