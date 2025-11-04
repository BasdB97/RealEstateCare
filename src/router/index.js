import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
	{ path: "/", component: () => import("@/views/HomePage.vue") },
	{ path: "/assigned-reports", component: () => import("@/views/AssignedReports.vue") },
	{ path: "/completed-reports", component: () => import("@/views/CompletedReports.vue") },
	{ path: "/knowledge-base", component: () => import("@/views/KnowledgeBase.vue") },
	{ path: "/settings", component: () => import("@/views/SettingsPage.vue") },
	{ path: "/search", component: () => import("@/views/SearchPage.vue") },
	{ path: "/information", component: () => import("@/views/InformationPage.vue") },
	// {
	// 	path: "/edit-report/:id",
	// 	name: "Edit Report",
	// 	component: () => import("@/views/EditReport.vue"),
	// },
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
