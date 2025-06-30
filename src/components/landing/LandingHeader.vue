<template>
    <header  v-if="!store.isMobile" class="fixed top-4 px-4 w-full h-16 lg:px-10 flex items-center z-50">
      <div class="flex items-center space-x-2 z-10">
        <div class="w-8 h-8  rounded-full flex items-center justify-center">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="currentColor"  class="text-green-400 icon icon-tabler icons-tabler-filled icon-tabler-guitar-pick"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 2c-1.613 0 -2.882 .104 -3.825 .323l-.23 .057c-3.019 .708 -4.945 2.503 -4.945 5.62c0 3.367 1.939 8.274 4.22 11.125c.32 .4 .664 .786 1.03 1.158l.367 .36a4.904 4.904 0 0 0 6.752 .011a15.04 15.04 0 0 0 1.41 -1.528c2.491 -3.113 4.221 -7.294 4.221 -11.126c0 -3.025 -1.813 -4.806 -4.71 -5.562l-.266 -.066c-.936 -.25 -2.281 -.372 -4.024 -.372z" /></svg>
        </div>
        <span class="font-bold text-xl">
          <a href="#" aria-label="Ir al inicio">
          Spotify-Stats
          </a>
        </span>
      </div>

      <nav class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-2 z-0">
        <a href="#solicitar-acceso" aria-label="Ir a cómo funciona" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Acceso</span>
        </a>
        <a href="#mockups" aria-label="Ir a cómo funciona" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Dispositivos</span>
        </a>
        <a href="#features" aria-label="Ir a cómo funciona" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Características</span>
        </a>
        <a href="#how-it-works"  aria-label="Ir a features" class="p-2 bg-transparent backdrop-blur-md rounded-lg hover:bg-[#9b22b6] transition-all duration-300 ease-in-out">
          <span class="text-lg font-medium">Cómo funciona</span>
        </a>
      </nav>

      <InteractiveHoverButton :text="'Login'" class="ml-auto z-10" @click="loginWithSpotify()"/>
    </header>

    <header v-else>
      <div class="fixed top-4 left-4 z-40 flex items-center space-x-2 px-4 py-2 rounded-full backdrop-blur-md bg-black/40 shadow-lg border border-white/10">
        <div class="w-8 h-8 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" class="text-green-400">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2c-1.613 0 -2.882 .104 -3.825 .323l-.23 .057c-3.019 .708 -4.945 2.503 -4.945 5.62c0 3.367 1.939 8.274 4.22 11.125c.32 .4 .664 .786 1.03 1.158l.367 .36a4.904 4.904 0 0 0 6.752 .011a15.04 15.04 0 0 0 1.41 -1.528c2.491 -3.113 4.221 -7.294 4.221 -11.126c0 -3.025 -1.813 -4.806 -4.71 -5.562l-.266 -.066c-.936 -.25 -2.281 -.372 -4.024 -.372z" />
          </svg>
        </div>
        <span class="font-bold text-lg text-white">
          <a href="#" aria-label="Ir al inicio">Spotify-Stats</a>
        </span>
      </div>

      <!-- Botón hamburguesa -->
      <Transition name="slide-fade" appear>
        <div class="fixed top-2 right-2 z-50">
          <label class="burger top-4 right-4 z-50" for="burger">
            <input type="checkbox" id="burger" class="hidden" v-model="open" />
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>
      </Transition>

      <!-- Menú deslizante lateral con items en columna -->
      <nav
        class="fixed top-0 right-0 h-full w-64 bg-black/80 backdrop-blur-md text-white z-40 transition-transform duration-500 transform px-6 py-10 flex flex-col space-y-6"
        :class="open ? 'translate-x-0' : 'translate-x-full'"
      >
        <a href="#solicitar-acceso" class="text-lg font-medium hover:text-[#9b22b6] transition-colors">Acceso</a>
        <a href="#mockups" class="text-lg font-medium hover:text-[#9b22b6] transition-colors">Dispositivos</a>
        <a href="#features" class="text-lg font-medium hover:text-[#9b22b6] transition-colors">Características</a>
        <a href="#how-it-works" class="text-lg font-medium hover:text-[#9b22b6] transition-colors">Cómo funciona</a>
        <InteractiveHoverButton :text="'Login'" class="ml-auto z-10 w-full" @click="loginWithSpotify()"/>
      </nav>
    </header>

</template>
<script setup lang="ts">
import { ref } from 'vue';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { loginWithSpotify } from "../../auth";
import { spotyStore } from "../../SpotifyStore/spotyStore.js";

const store = spotyStore();
const open = ref(false);

</script>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}

.burger {
  width: 40px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 50;
  overflow: visible;
}

.burger::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -20px;
  left: -20px;
  width: 80px;
  height: 80px;
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  /* ✅ Suavizado del borde */
  mask-image: radial-gradient(circle at center,
    black 0%,
    black 30%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center,
    black 0%,
    black 30%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%);

  pointer-events: none;
}


.burger input {
  display: none;
}

.burger span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.burger span:nth-of-type(1) {
  top: 0px;
  transform-origin: left center;
}

.burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

.burger span:nth-of-type(3) {
  top: 100%;
  transform: translateY(-100%);
  transform-origin: left center;
}

.burger input:checked ~ span:nth-of-type(1) {
  transform: rotate(45deg);
  top: 0px;
  left: 5px;
}

.burger input:checked ~ span:nth-of-type(2) {
  width: 0%;
  opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
  transform: rotate(-45deg);
  top: 28px;
  left: 5px;
}
</style>