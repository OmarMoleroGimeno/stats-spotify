<template>
  <div class="mx-auto p-8">
    <section
      v-for="(dayArtists, index) in days"
      :key="index"
      class="mb-16 p-6 rounded-lg"
    >
      <h2 class="text-xl font-extrabold text-center mb-8 text-white uppercase drop-shadow-lg">
        Día {{ index + 1 }}
      </h2>

      <!-- Aquí reemplazo la grilla por el texto con líneas -->
      <div class="text-white text-center font-bold uppercase tracking-wide drop-shadow-md space-y-1">
        <p
          v-for="(line, i) in splitIntoLines(dayArtists)"
          :key="i"
          :class="lineSizes[i]"
          class="mx-auto max-w-4xl"
        >
          <span v-for="(artist, idx) in line" :key="artist.uri">
            <a
              :href="`https://open.spotify.com/artist/${artist.uri.split(':').pop()}`"
              target="_blank"
              class="text-white hover:text-customGreen transition-colors duration-300"
            >
              {{ artist.name }}
            </a>
            <span v-if="idx < line.length - 1"> - </span>
          </span>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { spotyStore } from '../../SpotifyStore/spotyStore.js';

const store = spotyStore();

const artists = computed(() => {
  if (store.artists && Array.isArray(store.artists.items)) {
    return store.artists.items.slice(0, 50);
  }
  return [];
});

const days = computed(() => {
  const day1 = [];
  const day2 = [];
  const day3 = [];

  artists.value.forEach((artist, idx) => {
    const simplified = { name: artist.name, uri: artist.uri };
    const dayIndex = idx % 3;
    if (dayIndex === 0) day1.push(simplified);
    else if (dayIndex === 1) day2.push(simplified);
    else day3.push(simplified);
  });

  return [day1, day2, day3];
});

function splitIntoLines(artistsArray) {
  if (!Array.isArray(artistsArray) || artistsArray.length === 0) return [];

  const lines = [];
  const counts = [2, 3, 5]; // artistas por línea
  let start = 0;

  for (let i = 0; i < counts.length; i++) {
    lines.push(artistsArray.slice(start, start + counts[i]));
    start += counts[i];
  }

  const remaining = artistsArray.slice(start);
  if (remaining.length) {
    lines.push(remaining);
  }

  return lines;
}

const lineSizes = [
  "text-4xl",
  "text-2xl",
  "text-lg",
  "text-base",
];
</script>
