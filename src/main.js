import "@ionic/core/css/ionic.bundle.css";
import "@/assets/base.css";
import "@/assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import { IonicVue, IonIcon } from "@ionic/vue";
import { addIcons } from "ionicons";
import * as allIcons from "ionicons/icons";

import router from "@/router";

// Register all icons globally
addIcons(allIcons);

const app = createApp(App).use(IonicVue);

// Register IonIcon as a global component
app.component("ion-icon", IonIcon);

app.use(router).mount("#app");
