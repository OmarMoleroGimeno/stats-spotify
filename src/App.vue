<template>
  <div class="relative min-h-screen bg-black text-white overflow-hidden">
    <!-- Fondo fijo de partículas -->
    <ParticlesBg :quantity="150" class="fixed inset-0 z-0" />

    <!-- Header siempre visible -->
    <header v-if="!store.loading" class="fixed top-0 left-0 w-full z-20">
    <Header v-if="!isMobile" />
    <MobileMenu v-else />
  </header>

    <!-- Loader con transición -->
    <transition name="loader-fade" appear>
    <div
      v-show="store.loading"
      class="absolute inset-0 z-30 flex items-center justify-center bg-black/80"
    >
      <Loader />
    </div>
  </transition>

  <main ref="mainRef" class="relative z-10" v-show="!store.loading">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>

  <!-- Scroll to top button -->
  <ScrollTop icon="pi pi-arrow-up" />

<footer v-if="!store.loading" class="relative z-50 text-white py-4 flex flex-col items-center bg-black/40 backdrop-blur-md">
  <div class="w-4/5  h-px bg-white/30 mb-3"></div>
  <div class="flex justify-start w-4/5 px-12">
    <p>Created by: Omar Molero Gimeno</p>
  </div>
</footer>


  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import Header from "./components/header/Header.vue";
import { spotyStore } from "./SpotifyStore/spotyStore.js";
import ParticlesBg from "./components/ui/particles-bg/ParticlesBg.vue";
import Loader from "@/components/loader/Loader.vue";
import MobileMenu from "@/components/mobile-menu/MobileMenu.vue";

const store = spotyStore();
const isMobile = ref(false);

const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 1100;
}

onMounted(async () => {
  if (localStorage.getItem("spotify_token")) {
    await store.onInit();
  }
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

/* Reemplaza esto en tu <style> o agrégalo al final */

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.loader-fade-enter-to,
.loader-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>
