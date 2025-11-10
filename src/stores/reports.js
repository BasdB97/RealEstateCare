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
		lastFetch: null,
		knowledgeBase: [],
	}),

	getters: {
		assignedReports: (s) => (s.reports ?? []).filter((r) => !r.completed),
		completedReports: (state) => (state.reports ?? []).filter((r) => r.completed),
		getReportById: (state) => (id) => (state.reports ?? []).find((r) => r.id === id),
		byCategory: (s) => (c) => s.knowledgeBase.filter((i) => i.category === c),
		search: (s) => (q) =>
			s.knowledgeBase.filter((i) =>
				[i.title, i.description, ...(i.tags || [])]
					.join(" ")
					.toLowerCase()
					.includes(q.toLowerCase())
			),
	},

	actions: {
		async resetFromDbJson() {
			localStorage.clear();
			console.log("Local storage cleared");
			const response = await fetch("/db.json");
			if (!response.ok) throw new Error("db.json niet gevonden");
			const seed = await response.json();
			console.log("Seed data loaded:", seed);

			const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
			const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
			await api.put(`${baseUrl}/${binId}`, seed);

			this.reports = seed.reports;
			this._saveLocalCache();
		},

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
		async fetchReports(force = false) {
			// Prevent duplicate requests if already loading
			if (this.loading) {
				console.log("Already fetching reports, skipping...");
				return;
			}

			// Use cache if available and not forcing refresh (within 5 minutes)
			const cacheAge = this.lastFetch ? Date.now() - this.lastFetch : Infinity;
			if (!force && this.reports.length > 0 && cacheAge < 5 * 60 * 1000) {
				console.log("Using cached reports (age: " + Math.round(cacheAge / 1000) + "s)");
				return;
			}

			this.loading = true;
			this.error = null;
			console.log("Fetching reports from API...");

			try {
				// Load cache first for instant display
				this.hydrateFromCache();

				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;

				console.log("Making API request to:", `${baseUrl}/${binId}`);
				console.log("Environment vars check:", {
					hasBaseUrl: !!baseUrl,
					hasBinId: !!binId,
					baseUrl,
					binId,
				});

				const response = await api.get(`${baseUrl}/${binId}`);
				console.log("Response received:", response.status);

				this.reports = Array.isArray(response.data.record.reports)
					? response.data.record.reports
					: [];
				this.lastFetch = Date.now();
				this._saveLocalCache();
				console.log("Reports loaded:", this.reports.length);
			} catch (err) {
				console.error("Error fetching reports:", err);
				console.error("Error details:", {
					message: err.message,
					code: err.code,
					status: err.response?.status,
					statusText: err.response?.statusText,
				});
				this.error = "Er is een fout opgetreden bij het ophalen van de rapportages.";
				// Keep cached data if available
				if (this.reports.length === 0) {
					this.hydrateFromCache();
				}
			} finally {
				this.loading = false;
				console.log("Fetch complete, loading:", this.loading);
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

		async fetchKnowledgeBase() {
			this.loading = true;
			this.error = null;
			try {
				const baseUrl = import.meta.env.VITE_JSONBIN_BASE;
				const binId = import.meta.env.VITE_JSONBIN_BIN_ID;
				const response = await api.get(`${baseUrl}/${binId}`);
				console.log("Knowledge base response:", response);
				this.knowledgeBase = response.data.record.knowledgeBase || [];
				console.log("Knowledge base loaded:", this.knowledgeBase);
			} catch (e) {
				this.error = "Kon kennisbank niet laden";
			} finally {
				this.loading = false;
			}
		},
	},
});
