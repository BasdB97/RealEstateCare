<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
// import Dashboard from "./components/Dashboard.vue";
</script>

<template>
	<Header />
	<RouterView />
	<Footer />
</template>

<script>
export default {
	name: "App",
	components: {},
};
</script>
