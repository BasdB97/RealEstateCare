import { createRouter, createWebHistory } from "@ionic/vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
	{
		path: "/",
		redirect: "/home",
	},
	{
		path: "/home",
		name: "Home",
		component: HomePage,
	},
	{
		path: "/assigned-reports",
		name: "Assigned Reports",
		component: () => import("@/views/AssignedReports.vue"),
	},
	{
		path: "/completed-reports",
		name: "Completed Reports",
		component: () => import("@/views/CompletedReports.vue"),
	},
	{
		path: "/knowledge-base",
		name: "Knowledge Base",
		component: () => import("@/views/KnowledgeBase.vue"),
	},
	{
		path: "/settings",
		name: "Settings",
		component: () => import("@/views/SettingsPage.vue"),
	},
	{
		path: "/search",
		name: "Search",
		component: () => import("@/views/SearchPage.vue"),
	},
	{
		path: "/information",
		name: "Information",
		component: () => import("@/views/InformationPage.vue"),
	},
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
