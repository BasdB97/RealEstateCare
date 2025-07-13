import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "@/components/Dashboard.vue";

const routes = [
	{
		path: "/",
		name: "home",
		component: Dashboard,
	},
	{
		path: "/scheduled",
		name: "scheduled",
		component: () => import("@/components/Scheduled.vue"),
	},
	{
		path: "/completed",
		name: "completed",
		component: () => import("@/components/Completed.vue"),
	},
	{
		path: "/knowledge-base",
		name: "knowledge-base",
		component: () => import("@/components/KnowledgeBase.vue"),
	},
	{
		path: "/settings",
		name: "settings",
		component: () => import("@/components/Settings.vue"),
	},
	{
		path: "/search",
		name: "search",
		component: () => import("@/components/Search.vue"),
	},
	{
		path: "/information",
		name: "information",
		component: () => import("@/components/Information.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
