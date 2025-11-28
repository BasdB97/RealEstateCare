import { createRouter, createWebHistory } from "@ionic/vue-router";
import { useLoginStore } from "@/stores/login";

const routes = [
	{
		path: "/login",
		component: () => import("@/views/LoginPage.vue"),
		meta: { requiresAuth: false },
	},
	{
		path: "/",
		component: () => import("@/views/HomePage.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/assigned-reports",
		component: () => import("@/views/AssignedReports.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/completed-reports",
		component: () => import("@/views/CompletedReports.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/knowledge-base",
		component: () => import("@/views/KnowledgeBase.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/settings",
		component: () => import("@/views/SettingsPage.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/search",
		component: () => import("@/views/SearchPage.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/information",
		component: () => import("@/views/InformationPage.vue"),
		meta: { requiresAuth: true },
	},
	{
		path: "/reports/:id/edit",
		name: "edit-report",
		component: () => import("@/views/EditReport.vue"),
		props: (route) => ({ id: Number(route.params.id) }),
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

// Guard voor de router
router.beforeEach((to, from, next) => {
	const loggedIn = localStorage.getItem("loggedIn");
	if (to.meta.requiresAuth && !loggedIn) {
		next("/login");
	} else {
		next();
	}
});

export default router;
