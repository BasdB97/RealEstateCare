import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { IonicVue } from "@ionic/vue";
import BaseLayout from "./components/BaseLayout.vue";
import { createPinia } from "pinia";
import { useSettingsStore } from "./stores/settings";

// Ionic core + basis
import "@ionic/vue/css/core.css";
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";
// Optionele utils
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";
// Dark mode
// import '@ionic/vue/css/palettes/dark.always.css';
import "@ionic/vue/css/palettes/dark.class.css";
// import "@ionic/vue/css/palettes/dark.system.css";
// Theme vars
import "./theme/variables.css";
// Tailwind
import "./index.css";

const app = createApp(App).use(IonicVue).use(createPinia()).use(router);

app.component("BaseLayout", BaseLayout);

router.isReady().then(() => {
	useSettingsStore().loadSettings();
	app.mount("#app");
});
