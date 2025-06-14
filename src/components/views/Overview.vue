<template>
  <!-- <section v-if="store.loading"  class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <Loader></Loader>
  </section> -->
  <section class="flex-column items-center justify-center text-center mt-20 space-y-24  py-20">
      <!-- <h1 class="text-[40px]">Your music, your journey <br> unveiling  your Spotify stats like never before.</h1> -->
      <div class="flex justify-center gap-24">
          <!-- Top Artists -->
          <div class="flex flex-col items-center gap-6">
            <h2 class="text-[36px]">Top Artists</h2>
            <Artists></Artists>
          </div>
        <!-- Top Tracks -->
          <div class="flex flex-col items-center gap-6">
            <h2 class="text-[36px]">Top Songs</h2>
            <Tracks></Tracks>
          </div>
        </div>
      <div class="flex justify-center gap-24">
        <!-- Top Albums -->
          <div class="flex flex-col items-center gap-6">
            <h2 class="text-[36px]">Top Albums</h2>
            <Albums></Albums>
          </div>
          <div class="flex flex-col items-center gap-6">
            <h2 class="text-[36px]">Genres</h2>
            <Genres></Genres>
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
import Loader from "../loader/Loader.vue";

const store = spotyStore();

</script>