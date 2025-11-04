<template>
	<BaseLayout>
		<section class="h-full grid grid-cols-2 gap-6 p-4 place-items-stretch">
			<RouterLink
				v-for="item in items"
				:key="item.to"
				:to="item.to"
				class="menu-card"
				aria-label="menu item">
				<ion-icon :icon="item.icon" class="menu-icon" />
				<span class="menu-title">{{ item.label }}</span>
			</RouterLink>
		</section>
	</BaseLayout>
</template>

<script setup>
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";

const items = [
	{ to: "/assigned-reports", label: "Toegewezen", icon: bookmarkOutline },
	{ to: "/completed-reports", label: "Uitgevoerd", icon: checkmarkCircle },
	{ to: "/knowledge-base", label: "Kennisbank", icon: apps },
	{ to: "/settings", label: "Instellingen", icon: settings },
];
</script>

<style scoped>
.menu-card {
	@apply flex flex-col items-center justify-center gap-3 rounded-xl
                 px-8 py-10 shadow-lg bg-white/90 hover:bg-white
                 transition-all duration-200 no-underline ring-1 ring-slate-200;
}

.menu-icon {
	@apply text-6xl;
	color: #1e293b;
}
.menu-title {
	@apply font-bold text-2xl text-slate-900 leading-tight text-center;
}

/* dark support (optioneel) */
:global(.dark) .menu-card {
	@apply bg-slate-800/70 hover:bg-slate-800 ring-slate-700;
}
:global(.dark) .menu-icon {
	color: #f1f5f9;
}
:global(.dark) .menu-title {
	@apply text-slate-100;
}
</style>
