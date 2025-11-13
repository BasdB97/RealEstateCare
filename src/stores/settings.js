import { defineStore } from "pinia";

export const useSettingsStore = defineStore("settings", {
	state: () => ({
		name: "",
		username: "",
		profession: "",
		email: "",
		avatar: null,
		language: "nl",
		notifications: {
			push: true,
			email: true,
		},
		sound: true,
		vibration: true,
	}),

	getters: {
		avatarInitials: (state) => {
			if (!state.name) return "?";
			const names = state.name.trim().split(" ");
			if (names.length === 1) return names[0][0].toUpperCase();
			return (names[0][0] + names[names.length - 1][0]).toUpperCase();
		},
	},

	actions: {
		setTheme(theme) {
			this.theme = theme; // 'dark' | 'light'
			const root = document.documentElement;
			root.classList.toggle("dark", theme === "dark");
			root.style.setProperty("color-scheme", theme === "dark" ? "dark" : "light");
			this.saveSettings();
		},
		toggleTheme() {
			this.setTheme(this.theme === "dark" ? "light" : "dark");
		},
		loadSettings() {
			const saved = JSON.parse(localStorage.getItem("user-settings") || "{}");
			Object.assign(this, saved);
			this.setTheme(
				this.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
			);
		},
		saveSettings() {
			const settings = {
				name: this.name,
				username: this.username,
				profession: this.profession,
				email: this.email,
				avatar: this.avatar,
				language: this.language,
				notifications: this.notifications,
				sound: this.sound,
				vibration: this.vibration,
			};
			localStorage.setItem("user-settings", JSON.stringify(settings));
		},

		updateNotificationSettings(type, value) {
			this.notifications[type] = value;
			this.saveSettings();
		},

		clearCache() {
			const userSettings = localStorage.getItem("user-settings");
			localStorage.clear();
			if (userSettings) {
				localStorage.setItem("user-settings", userSettings);
			}
		},
	},
});
