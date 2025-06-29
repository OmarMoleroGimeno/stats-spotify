<template>
    <header class="fixed top-4 px-4 w-full h-16 lg:px-10 flex items-center z-50">
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
</template>
<script setup lang="ts">
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { loginWithSpotify } from "../../auth";

</script>