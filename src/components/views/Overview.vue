<template>

  <section class="flex flex-col items-center justify-center mdx:py-20 text-center mt-32 space-y-24 py-0 px-4">
    <!-- Artistas y Canciones -->
    <div class="flex flex-col mdx:flex-row justify-center items-center mdx:items-start gap-12 mdx:gap-24 w-full max-w-6xl">
      <!-- Top Artists -->
      <div class="flex flex-col items-center gap-6 w-full mdx:w-1/2">
        <h2 class="text-2xl mdx:text-3xl font-semibold">Top Artists</h2>
        <Artists />
      </div>

      <!-- Top Tracks -->
      <div class="flex flex-col items-center gap-6 w-full mdx:w-1/2">
        <h2 class="text-2xl mdx:text-3xl font-semibold">Top Songs</h2>
        <Tracks />
      </div>
    </div>

    <!-- Álbumes y Géneros -->
    <div class="flex flex-col mdx:flex-row justify-center items-center mdx:items-start gap-12 mdx:gap-24 w-full max-w-6xl">
      <!-- Top Albums -->
      <div class="flex flex-col items-center gap-6 w-full mdx:w-1/2">
        <h2 class="text-2xl mdx:text-3xl font-semibold">Top Albums</h2>
        <Albums />
      </div>

      <!-- Genres -->
      <div class="flex flex-col items-center gap-6 w-full mdx:w-1/2">
        <h2 class="text-2xl mdx:text-3xl font-semibold">Genres</h2>
        <Genres />
      </div>
    </div>
  </section>
</template>
<script setup>
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import Artists from '../artists/Artists.vue';
import Tracks from '../tracks/Tracks.vue';
import Genres from '../genres/Genres.vue';
import Albums from '../albums/Albums.vue';

const store = spotyStore();

</script>