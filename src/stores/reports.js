import { defineStore } from "pinia";
import api from "@/lib/axios";

// Functie om de datum te normaliseren output: YYYY-MM-DD
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
		lastFetch: null,
	}),

	getters: {
		assignedReports: (state) => (state.reports ?? []).filter((r) => !r.completed),
		completedReports: (state) => (state.reports ?? []).filter((r) => r.completed),
		getReportById: (state) => (id) => (state.reports ?? []).find((r) => r.id === id),
	},

	actions: {
		// Reset de database (bij elke login)
		async resetDatabase() {
			try {
				const response = await fetch("/db.json");
				if (!response.ok) throw new Error("db.json niet gevonden");

				const seed = await response.json();
				const url = "https://api.jsonbin.io/v3/b/6891b4e2f7e7a370d1f429da";
				const putResponse = await api.put(url, seed);

				if (putResponse.status !== 200) {
					throw new Error(`Reset mislukt, status: ${putResponse.status}`);
				}

				this.reports = seed.reports;
				this._saveLocalCache();

				return true;
			} catch (err) {
				console.error("Reset error:", err);
				throw err;
			}
		},

		// Cache opslaan
		_saveLocalCache() {
			localStorage.setItem("reports-cache", JSON.stringify(this.reports));
			localStorage.setItem("reports-dirty", JSON.stringify(this.dirtyReports));
		},

		// Cache laden
		hydrateFromCache() {
			const cache = localStorage.getItem("reports-cache");
			const dirty = localStorage.getItem("reports-dirty");
			if (cache) this.reports = JSON.parse(cache);
			if (dirty) this.dirtyReports = JSON.parse(dirty);
		},

		// Rapporten ophalen via API
		async fetchReports(force = false) {
			// Prevent duplicate requests if already loading
			if (this.loading) {
				return;
			}

			// Gebruik cache opslag wanneer beschikbaar
			const cacheAge = this.lastFetch ? Date.now() - this.lastFetch : Infinity;
			if (!force && this.reports.length > 0 && cacheAge < 5 * 60 * 1000) {
				// console.log("Gebruik cached rapportages (leeftijd: " + Math.round(cacheAge / 1000) + "s)");
				return;
			}

			this.loading = true;
			this.error = null;

			try {
				// Laad cache eerst voor instant display
				this.hydrateFromCache();

				const url = "https://api.jsonbin.io/v3/b/6891b4e2f7e7a370d1f429da";
				const response = await api.get(url);

				// Sla de rapporten op als array
				this.reports = Array.isArray(response.data.record.reports)
					? response.data.record.reports
					: [];

				this.lastFetch = Date.now();
				this._saveLocalCache();
			} catch (err) {
				// console.error("Error details:", {
				// 	message: err.message,
				// 	code: err.code,
				// 	status: err.response?.status,
				// 	statusText: err.response?.statusText,
				// });
				this.error = "Fout bij ophalen van rapportages: " + err.message;
				// Gebruik cache opslag als er geen rapporten komen van de API
				if (this.reports.length === 0) {
					this.hydrateFromCache();
				}
			} finally {
				this.loading = false;
			}
		},

		// Opslaan van inspectie in lokale opslag
		updateInspectionLocal(reportId, updated) {
			// Valideer input
			if (!updated?.id || !updated?.type) throw new Error("ID of type ontbreekt");
			// Haal rapport op via id uit de store en check of het bestaat
			const report = this.getReportById(reportId);
			if (!report) throw new Error(`Report ${reportId} niet gevonden`);

			// Als inspectie id en type bestaan, update de inspectie, anders behoud de originele inspectie
			report.inspections = report.inspections.map((i) =>
				i.id === updated.id && i.type === updated.type
					? { ...i, ...updated, date: normalizeDate(updated.date) }
					: i
			);

			// Markeer als lokale wijziging
			this.dirtyReports[reportId] = true;
			// Sla cache op
			this._saveLocalCache();
		},

		// Verstuur rapport naar server (afgerond of niet)
		async persistReportWithStatus(reportId, completed) {
			const idx = this.reports.findIndex((r) => r.id === reportId);
			if (idx === -1) throw new Error(`Rapport ${reportId} niet gevonden`);

			// Haal het originele rapport op
			const original = this.reports[idx];
			// Maak een kopie van het originele rapport en update de status
			const next = { ...original, completed };

			// Update de rapporten in de store
			this.reports = this.reports.map((r) => (r.id === reportId ? next : r));
			// Sla cache op
			this._saveLocalCache();

			// Rapport opslaan op de server
			try {
				const url = "https://api.jsonbin.io/v3/b/6891b4e2f7e7a370d1f429da";

				// Haal de volledige database op
				const getResponse = await api.get(url);
				const fullDatabase = getResponse.data.record;

				// Update de rapporten in de database
				fullDatabase.reports = this.reports;

				// Terugsturen van de volledige database
				const response = await api.put(url, fullDatabase);

				// Check of het opslaan is gelukt
				if (response.status !== 200) {
					throw new Error(`Opslaan mislukt, status: ${response.status}`);
				}

				// Verwijder de lokale wijziging
				delete this.dirtyReports[reportId];
				// Sla cache op
				this._saveLocalCache();
				return true;
			} catch (err) {
				// Rollback als er een fout optreedt
				this.reports = this.reports.map((r) => (r.id === reportId ? original : r));
				this._saveLocalCache();
				this.error = completed ? "Opslaan & afronden mislukt" : "Opslaan mislukt";
				throw err;
			}
		},
	},
});
