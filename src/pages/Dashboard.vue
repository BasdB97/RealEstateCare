<template>
  <base-layout page-title="Dashboard">
    <div id="contentSlot">
      <div class="card" id="scheduled">
        <ion-icon
          class="menuIcon"
          :icon="bookmarkOutline">
        </ion-icon>
        <h3 class="menuTitle">Scheduled</h3>
      </div>
      <div class="card" id="completed">
        <ion-icon
          class="menuIcon"
          :icon="checkmarkCircle">
        </ion-icon>
        <h3 class="menuTitle">Completed</h3>
      </div>
      <div class="card" id="base">
        <ion-icon
          class="menuIcon"
          :icon="appsSharp">
        </ion-icon>
        <h3 class="menuTitle">Knowledge base</h3>
      </div>
      <div class="card" id="settings">
        <ion-icon
          class="menuIcon"
          :icon="settingsSharp">
        </ion-icon>
        <h3 class="menuTitle">Settings</h3>
      </div>
    </div>
  </base-layout>
</template>

<script>
import {
  bookmarkOutline,
  checkmarkCircle,
  appsSharp,
  settingsSharp
} from 'ionicons/icons';

import {
  IonIcon
} from '@ionic/vue';

import { defineComponent } from 'vue';

export default defineComponent({
name: 'DashBoard',
components: {
  IonIcon
},
setup() {
  return {
    bookmarkOutline,
    checkmarkCircle,
    appsSharp,
    settingsSharp
  };
},
});
</script>

<style scoped>
  #contentSlot{
    margin: 0 auto;
    padding: 10px;
    block-size: 100%;
    inline-size: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-row: auto auto;
    gap: 10px;
  }
  .card{
    box-shadow: 1px 1px 1px 1px var( --ion-color-medium-shade);
    padding: 20px;
    border-radius: 5px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 40px;
  }

  h3 {
    color: var(--accent-dark);
  }
</style>