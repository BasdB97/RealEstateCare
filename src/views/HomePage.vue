<template>
	<BaseLayout>
		<div class="h-full grid grid-cols-2 gap-6 p-4 place-items-stretch">
			<DashboardCard
				v-for="item in items"
				:key="item.to"
				:to="item.to"
				:label="item.label"
				:icon="item.icon" />
		</div>
	</BaseLayout>
</template>

<script setup>
import { bookmarkOutline, checkmarkCircle, apps, settings } from "ionicons/icons";
import DashboardCard from "@/components/DashboardCard.vue";

const items = [
	{ to: "/assigned-reports", label: "Toegewezen", icon: bookmarkOutline },
	{ to: "/completed-reports", label: "Uitgevoerd", icon: checkmarkCircle },
	{ to: "/knowledge-base", label: "Kennisbank", icon: apps },
	{ to: "/settings", label: "Instellingen", icon: settings },
];
</script>

<style scoped></style>
