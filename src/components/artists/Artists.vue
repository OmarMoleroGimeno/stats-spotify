<template>
  <div
    class="relative flex flex-col justify-start items-center w-[29.5rem] rounded-2xl border-2 border-white/30 backdrop-blur-sm shadow-[0_0_20px_#1DB95466]"
  >
    <div class="p-6 rounded-2xl  w-full">
      <!-- Imágenes de los 3 primeros artistas -->
      <div class="relative flex items-center justify-center gap-4 mb-6">
        <!-- Segundo lugar -->
        <img
          v-if="store.artists?.items?.[1]"
          :src="store.artists.items[1].images[0]?.url"
          class="h-24 w-24 rounded-full object-cover border-2 border-white/40 shadow-md"
          alt="2nd Artist"
        />
        <!-- Primer lugar -->
        <img
          v-if="store.artists?.items?.[0]"
          :src="store.artists.items[0].images[0]?.url"
          class="h-32 w-32 z-10 rounded-full object-cover border-4 border-white shadow-lg"
          alt="Top Artist"
        />
        <!-- Tercer lugar -->
        <img
          v-if="store.artists?.items?.[2]"
          :src="store.artists.items[2].images[0]?.url"
          class="h-24 w-24 rounded-full object-cover border-2 border-white/40 shadow-md"
          alt="3rd Artist"
        />
      </div>

      <!-- Lista Top 10 -->
      <ul class="w-full divide-y divide-white/20">
        <li
          v-for="(artist, index) in store.artists?.items?.slice(0, 10)"
          :key="artist.id"
          class="flex items-center py-3 h-[81px] text-white text-2xl"
        >
          <span class="w-6 text-lg font-bold opacity-80">{{ index + 1 }}.</span>
          <img :src="artist.images[0]?.url" class="ml-4 h-10 w-10 z-10 rounded-full object-cover" alt="image artist">
          <span class="ml-4 text-white truncate text-lg cursor-pointer">{{ artist.name }}</span>
        </li>
      </ul>
      
      <!-- BorderBeam decorativo -->
      <BorderBeam
        :size="250"
        :duration="8"
        :delay="6"
        :border-width="3"
        gradient="linear-gradient(135deg, #1DB954, #191414)"
      />
    </div>
  </div>
</template>

<script setup>
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import BorderBeam from '../ui/border-beam/BorderBeam.vue';

const store = spotyStore();
</script>
