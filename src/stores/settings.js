import { defineStore } from "pinia";

// Experiment met sleutel voor lokale opslag.
const STORAGE_KEY = "user-settings";

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		name: "",
		username: "",
		profession: "",
		email: "",
		avatar: null,
		pushNotificationsEnabled: true,
		soundEnabled: true,
		theme: "light", // Default theme is light
	}),

	actions: {
		loadSettings() {
			// Haal de instellingen op uit de lokale opslag
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return;

			// Gebruik de instellingen
			try {
				const data = JSON.parse(raw);
				if (data.theme) this.theme = data.theme;
				if (typeof data.soundEnabled === "boolean") this.soundEnabled = data.soundEnabled;
				if (typeof data.pushNotificationsEnabled === "boolean")
					this.pushNotificationsEnabled = data.pushNotificationsEnabled;
			} catch (e) {
				console.error("Kon settings niet lezen:", e);
			}
		},

		saveSettings() {
			const settings = {
				name: this.name,
				username: this.username,
				profession: this.profession,
				email: this.email,
				avatar: this.avatar,
				soundEnabled: this.soundEnabled,
				pushNotificationsEnabled: this.pushNotificationsEnabled,
				theme: this.theme,
			};
			localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
		},

		// Dark-light mode aanpassen
		applyTheme() {
			document.documentElement.classList.toggle("dark", this.theme === "dark");
		},
		toggleTheme() {
			this.theme = this.theme === "dark" ? "light" : "dark";
			this.applyTheme();
			this.saveSettings();
		},

		// Push meldingen aanpassen
		setPushNotificationsEnabled(value) {
			this.pushNotificationsEnabled = value;
			this.saveSettings();
		},
		// Geluidseffecten aanpassen
		setSoundEnabled(value) {
			this.soundEnabled = value;
			this.saveSettings();
		},
	},
});
