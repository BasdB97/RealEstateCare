<template>
    <ion-page>
    <ion-header>
      <ion-toolbar id="headerToolbar">
        <img src="../theme/logo/logo_full.png" alt="Real Estate Care Logo" />
        <!-- <ion-title>{{ pageTitle }}</ion-title> -->
        <ion-buttons id="headerButtons" slot="end">
          <ion-button>
            <ion-icon :icon="notifications"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon :icon="settings"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <slot />
    </ion-content>
    <ion-footer>
      <ion-toolbar id="footerToolbar">
        <ion-buttons id="footerButtons">
          <ion-button>
            <ion-icon :icon="build"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon :icon="search"></ion-icon>
          </ion-button>
          <ion-button>
            <ion-icon :icon="alertCircle"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonButton,
  IonButtons,
  IonIcon
} from '@ionic/vue';

import { defineComponent } from 'vue';

import {
  notifications,
  settings,
  build,
  search,
  alertCircle
} from 'ionicons/icons';

export default defineComponent({
  props: {
    pageTitle: String
  },
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonButton,
    IonButtons,
    IonIcon
  },
  setup() {
    return {
      notifications,
      settings,
      build,
      search,
      alertCircle
    };
  },
});
</script>

<style scoped>
ion-toolbar{
  --min-block-size: 80px;
  --background: var(--accent-color);
  block-size: 100%;
}

ion-header {
  block-size: 10vh;
}

ion-icon{
  font-size: 25px
}

#headerToolbar{
  display: flex;
  align-items: center;
}

img {
  max-inline-size: 80%;
  block-size: 100%;
}

#footerToolbar{
  display: flex;
  align-items: center;
}

#footerButtons{
  justify-content: space-evenly;
}
</style>