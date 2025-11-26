import { defineStore } from "pinia";
import api from "@/lib/axios";

export const useKnowledgeBaseStore = defineStore("knowledgeBase", {
	state: () => ({
		knowledgeBase: [],
		loading: false,
		error: null,
	}),

	actions: {
		async fetchKnowledgeBase() {
			this.loading = true;
			this.error = null;
			try {
				const url = "https://api.jsonbin.io/v3/b/6891b4e2f7e7a370d1f429da";
				const response = await api.get(url);
				// console.log("Knowledge base response:", response);
				this.knowledgeBase = response.data.record.knowledgeBase || [];
				if (response.status !== 200) {
					throw new Error(`Kennisbank laden mislukt, status: ${response.status}`);
				}
				this.loading = false;
				return true;
			} catch (err) {
				// console.error("Error fetching knowledge base:", err);
				this.error = "Kon kennisbank niet laden:" + err.message;
				this.loading = false;
				throw err;
			}
		},
	},
});
