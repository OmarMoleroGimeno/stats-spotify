<template>
  <div
    class="relative flex flex-col justify-start items-center w-[29.5rem] overflow-hidden rounded-2xl border-2 border-white/30 backdrop-blur-sm shadow-[0_0_20px_#1DB95466]"
  >
    <div v-if="!store.loading" class="p-6 rounded-2xl w-full">
      <DonutChart
        :data="donutData"
        index="name"
        category="total"
        :value-formatter="valueFormatter"
        :colors="[
        '#004d1a',
        '#066527',
        '#0f7a36',
        '#179b44',
        '#1DB954',
        '#23a55a',
        '#3cbf3c',
        '#66c266',
        '#8fd48f',
        '#b6e6b6',
        '#e0f8e0'
      ]"
      />
      <ul class="w-full divide-y divide-white/20">
        <li
          v-for="(genere, index) in store.genres.slice(0, 10)"
          :key="index"
          class="flex items-center py-2 h-[77.3px] text-white text-2xl"
        >
          <span class="w-6 text-lg font-bold opacity-80">{{ index + 1 }}.</span>
          <span class="ml-4 truncate text-lg">{{ genere.genre.charAt(0).toUpperCase() + genere.genre.slice(1) }}</span>
          <AnimatedCircularProgressBar
            :max="100"
            :min="0"
            :value="genere.percentage"
            class="h-12 w-12 text-[12px] ml-auto"
          />
        </li>
      </ul>
    </div>

    <!-- Loading spinner opcional -->
    <div v-else class="p-6 w-full text-white text-center">
      Loading...
    </div>

    <BorderBeam
      :size="250"
      :duration="8"
      :delay="6"
      :border-width="3"
      gradient="linear-gradient(135deg, #1DB954, #191414)"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import DonutChart from '../ui/chart-donut/DonutChart.vue';
import BorderBeam from '../ui/border-beam/BorderBeam.vue';
import AnimatedCircularProgressBar from '../ui/animated-circular-progressbar/AnimatedCircularProgressBar.vue';

const store = spotyStore();

const donutData = computed(() => {
  if (!store.genres || store.genres.length === 0) return [];
  return store.genres.map(g => ({
    name: g.genre,
    total: g.percentage
  }));
});

function valueFormatter(val: number) {
  return `${val.toFixed(1)}%`;
}
</script>