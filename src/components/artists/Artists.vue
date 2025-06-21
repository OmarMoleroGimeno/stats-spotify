<template>
  <div
    class="relative flex flex-col justify-start items-center w-full max-w-[29.5rem] sm:w-[29.5rem] rounded-2xl border-2 border-white/30 backdrop-blur-sm shadow-[0_0_20px_#1DB95466] overflow-hidden"
  >
    <div class="w-full px-4 py-5 sm:p-6 rounded-2xl">
      <!-- Imágenes de los 3 primeros artistas -->
      <div class="relative flex items-center justify-center gap-2 sm:gap-4 mb-5 sm:mb-6">
        <!-- Segundo lugar -->
        <img
          v-if="store.artists?.items?.[1]"
          :src="store.artists.items[1].images[0]?.url"
          class="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-white/40 shadow-md"
          alt="2nd Artist"
        />
        <!-- Primer lugar -->
        <img
          v-if="store.artists?.items?.[0]"
          :src="store.artists.items[0].images[0]?.url"
          class="h-20 w-20 sm:h-32 sm:w-32 z-10 rounded-full object-cover border-4 border-white shadow-lg"
          alt="Top Artist"
        />
        <!-- Tercer lugar -->
        <img
          v-if="store.artists?.items?.[2]"
          :src="store.artists.items[2].images[0]?.url"
          class="h-16 w-16 sm:h-24 sm:w-24 rounded-full object-cover border-2 border-white/40 shadow-md"
          alt="3rd Artist"
        />
      </div>

      <!-- Lista Top 10 -->
      <ul class="w-full divide-y divide-white/20">
        <li
          v-for="(artist, index) in store.artists?.items?.slice(0, 10)"
          :key="artist.id"
          class="flex items-center py-2 sm:py-3 h-[68px] sm:h-[81px] text-white text-base sm:text-2xl"
        >
          <span class="w-6 text-sm sm:text-lg font-bold opacity-80">{{ index + 1 }}.</span>
          <img
            :src="artist.images[0]?.url"
            class="ml-3 sm:ml-4 h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
            alt="image artist"
          />
          <Button
            variant="link"
            class="ml-3 sm:ml-4 text-sm sm:text-lg text-white truncate text-left"
            @click="openArtist(artist.external_urls.spotify)"
          >
            {{ artist.name }}
          </Button>
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
import { Button } from '@/components/ui/button';

const store = spotyStore();

function openArtist(uri) {
  window.open(uri);
}
</script>
