<template>
  <div class="relative min-h-screen bg-black text-white overflow-hidden">
    <!-- Fondo fijo de partículas -->
    <ParticlesBg v-if="route.path !== '/'" :quantity="150" class="fixed inset-0 z-0" />

    <!-- Header siempre visible -->
    <header v-if="!store.loading && store.token !== null" class="fixed top-0 left-0 w-full z-20">
    <Header v-if="!store.isMobile" />
    <MobileMenu v-else />
  </header>

    <!-- Loader con transición -->
    <transition name="loader-fade" appear>
    <div
      v-show="store.loading"
      class="absolute inset-0 z-30 flex items-center justify-center bg-black/80"
    >
      <Loader/>
    </div>
  </transition>

  <main ref="mainRef" class="relative z-10" v-show="!store.loading">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </main>

  <Toaster/>

  <!-- Scroll to top button -->
  <ScrollTop icon="pi pi-arrow-up" />

<footer v-if="!store.loading" class="relative z-50 text-white py-6 bg-black/40 backdrop-blur-md">
  <!-- Línea divisoria -->
  <div class="w-4/5 mx-auto h-px bg-white/30 mb-6"></div>

  <!-- Contenido principal -->
  <div class="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm space-y-4 md:space-y-0">
    <!-- Izquierda: Nombre -->
    <div class="w-full md:w-1/3 text-center md:text-left">
      <p>Created by: Omar Molero Gimeno</p>
    </div>

    <!-- Centro: Derechos y aviso legal -->
    <div class="w-full md:w-1/3 text-center">
      <p>&copy; 2025 Spotify Stats. All rights reserved.</p>
      <p class="text-xs text-white/60">
        This product uses the Spotify Web API but is not endorsed or certified by Spotify.
      </p>
    </div>

    <!-- Derecha: Redes sociales -->
    <div class="w-full md:w-1/3 flex justify-center md:justify-end space-x-4">
      <!-- GitHub -->
      <a href="https://github.com/OmarMoleroGimeno" aria-label="Ir al perfil de github" target="_blank" rel="noopener noreferrer"
         class="hover:text-customGreen transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <svg width="28" height="28" viewBox="0 0 1024 1024" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M512 0C229.2 0 0 229.2 0 512c0 226.4 146.8 418 350.4 485.6 25.6 4.8 35.2-11.2 35.2-24.8v-86.4c-142.4 30.4-172.8-68.8-172.8-68.8-23.2-59.2-57.6-75.2-57.6-75.2-47.2-32 3.2-31.2 3.2-31.2 52 3.2 79.2 53.6 79.2 53.6 46.4 79.2 121.6 56 150.4 43.2 4.8-33.6 18.4-56 33.6-68.8-113.6-13.6-232.8-56.8-232.8-252.8 0-56 20-102.4 52.8-138.4-5.6-13.6-22.8-68.8 5.6-142.4 0 0 42.4-13.6 139.2 52.8 40-11.2 84-16.8 127.2-16.8 43.2 0 87.2 5.6 127.2 16.8 96.8-66.4 139.2-52.8 139.2-52.8 28.8 73.6 11.2 128.8 5.6 142.4 32.8 36 52.8 82.4 52.8 138.4 0 196.8-119.2 239.2-232.8 252.8 19.2 16.8 36 48.8 36 99.2v147.2c0 13.6 9.6 29.6 35.2 24.8C877.6 930 1024 738.4 1024 512 1024 229.2 794.8 0 512 0z"/>
        </svg>
      </a>
      <!-- LinkedIn -->
      <a href="https://linkedin.com/in/omar-molero-gimeno-33526b2aa" aria-label="Ir al perfil de linkedin" target="_blank" rel="noopener noreferrer"
         class="hover:text-customGreen transition-transform duration-300 ease-in-out hover:scale-110 cursor-pointer">
        <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zM7.5 8h3.8v2.2h.05c.53-1 1.83-2.2 3.75-2.2 4.01 0 4.9 2.6 4.9 6V24h-4v-7.5c0-1.79-.03-4.1-2.5-4.1s-2.88 1.95-2.88 4v7.6h-4V8z"/>
        </svg>
      </a>
    </div>
  </div>
</footer>

  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import Header from "./components/header/Header.vue";
import { spotyStore } from "./SpotifyStore/spotyStore.js";
import ParticlesBg from "./components/ui/particles-bg/ParticlesBg.vue";
import Loader from "@/components/loader/Loader.vue";
import MobileMenu from "@/components/mobile-menu/MobileMenu.vue";
import { useRoute } from 'vue-router';
import { Toaster } from '@/components/ui/toast';

const store = spotyStore();
const route = useRoute();

onMounted(async () => {
  if (localStorage.getItem("spotify_token")) {
    await store.onInit();
  }
  store.initializeUi();
});

onBeforeUnmount(() => {
  store.destroyUi();
});
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
