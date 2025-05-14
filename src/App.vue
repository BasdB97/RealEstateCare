<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Dashboard from "./components/Dashboard.vue";
import InspectionList from "./components/InspectionList.vue";
</script>

<template>
	<div class="app-container">
		<Header />
		<main class="main-content">
			<Dashboard />
			<InspectionList />
		</main>
		<Footer />
	</div>
</template>
