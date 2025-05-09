<template>
	<header class="bg-[#00aaa2]">
		<img src="../assets/logo.svg" class="logo" alt="logo" height="150px" />
	</header>
</template>

<style scoped>
header {
	border-bottom: 1px solid #00aaa2;
	padding: 1rem;
}
.logo {
	margin-bottom: 20px;
	filter: invert(100%);
	max-height: 70px;
}
</style>

<script>
export default {
	name: "Header",
	props: {
		msg: String,
	},
};
</script>
