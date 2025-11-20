import { defineStore } from "pinia";
import api from "@/lib/axios";

export const useLoginStore = defineStore("login", {
	state: () => ({
		isAuthenticated: false,
		user: null,
		authToken: null,
		employeeId: null,
		employeePassword: null,
		employeeName: "",
	}),

	actions: {
		async login(employeeId, password) {
			this.employeeId = employeeId;
			this.password = password;
			try {
				const url = "https://api.jsonbin.io/v3/b/6891b4e2f7e7a370d1f429da";
				const response = await api.get(url, {
					headers: {
						"X-Master-Key": "$2a$10$NUaYzbl3tlDKZ7Iw2oYwY.JcWt88FEwuEwvHS9D838F2Dcw6lk3J.",
						"X-JSON-Path": `$.users[?(@.employeeId == "${employeeId}" && @.password == "${password}")]`,
					},
				});

				console.log("Filtered users:", response.data.record);

				// response.data.record is direct een array met de gefilterde gebruiker(s)
				if (response.status === 200 && response.data.record[0] !== undefined) {
					// Genereer altijd een 6-cijferige code (100000 tot 999999)
					const randomNumber = Math.floor(Math.random() * 900000) + 100000;
					console.log("randomNumber", randomNumber);
					localStorage.setItem("randomNumber", randomNumber);
					const user = response.data.record[0]; // Eerste (en enige) match
					this.employeeName = user.name;
					this.employeeId = user.employeeId;
					console.log("Login successful for:", user.name);
					localStorage.setItem("employeeName", user.name);
					localStorage.setItem("employeeId", user.employeeId);
					localStorage.setItem("loggedIn", true);
					return randomNumber;
				} else {
					this.employeeName = "";
					console.log("Login failed - no matching user found");
					throw new Error("Login failed - no matching user found");
				}
			} catch (err) {
				console.error(err);
				throw err; // Re-throw de error zodat LoginPage.vue het kan afhandelen
			}
		},
		logout() {
			localStorage.clear();
			this.isAuthenticated = false;
			this.user = null;
			this.authToken = null;
			this.employeeId = null;
			this.employeePassword = null;
			this.employeeName = "";
			localStorage.removeItem("loggedIn");
		},
	},
});
