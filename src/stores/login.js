import { defineStore } from "pinia";

export const useLoginStore = defineStore("login", {
	state: () => ({
		isAuthenticated: false,
		user: null,
    authToken: null,
    employeeId: null,
    employeepassword: null,
	}),
});