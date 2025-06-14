<template>
  <section class="relative flex items-center justify-between px-8 py-6">
    <!-- Logo alineado a la izquierda -->
    <!-- <Logo :logo="'Default'" /> -->
     <TimeSelect></TimeSelect>
    <!-- Navigation centrado absoluto -->
    <div class="absolute left-1/2 transform -translate-x-1/2">
      <NavigationMenu />
    </div>

    <!-- Botón alineado a la derecha -->
    <div>
      <Profile v-if="store.userProfile.email" />
    </div>
  </section>
</template>

<script setup>
import NavigationMenu from "../navigation/Navigation-menu.vue";
import Logo from "../logo/Logo.vue";
import Profile from "../profile/Profile.vue";
import { spotyStore } from "../../SpotifyStore/spotyStore.js";
import TimeSelect from './timeSelect/TimeSelect.vue'

const store = spotyStore();
</script>
