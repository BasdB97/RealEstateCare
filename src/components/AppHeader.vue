<template>
	<header>
		<div class="bg-primarybg flex justify-between h-14">
			<RouterLink to="/">
				<img src="/src/assets/images/logo.svg" alt="RealEstateCare Logo" class="invert h-14 p-2" />
			</RouterLink>

			<div class="flex items-center">
				<IonIcon :icon="logOutOutline" @click="handleLogout" />
				<IonIcon :icon="notifications" class="header-icon"></IonIcon>
			</div>
		</div>
	</header>
</template>

<script setup>
import { IonIcon, IonButton } from "@ionic/vue";
import { notifications, refresh, logOutOutline } from "ionicons/icons";
import { ref } from "vue";
import { useReportsStore } from "@/stores/reports";
import { useLoginStore } from "@/stores/login";
import { useRouter } from "vue-router";

const busy = ref(false);
const store = useReportsStore();
const loginStore = useLoginStore();
const router = useRouter();

async function onReset() {
	try {
		busy.value = true;
		await store.resetFromDbJson();
	} finally {
		busy.value = false;
	}
}

const handleLogout = () => {
	loginStore.logout();
	router.push("/login");
};
</script>

<style scoped>
ion-icon {
	color: #fff;
	padding-inline-end: 1rem;
	font-size: 36px;
}
ion-icon:active {
	color: #d1d5db;
	scale: 1.05;
	cursor: pointer;
	transition-property: color, background-color, border-color, outline-color, text-decoration-color,
		fill, stroke;
	transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	transition-duration: 200ms;
}
</style>
