<template>
  <section class="relative z-10 pt-32 flex flex-col items-center">
    <h1 class="text-[32px] sm:text-[40px] md:text-[50px] whitespace-nowrap mb-10 sm:mb-16 md:mb-20">
      Top Genres
    </h1>
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
      class="w-full h-[20rem]"
    />
    <div class="mt-12 w-5/6">
      <Table class="text-lg">
        <TableCaption>Top {{ genres.length }} genres</TableCaption>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableHead>Rank</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead v-if="!store.isMobile">Followers</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead v-if="!store.isMobile">Popularity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            class="hover:bg-[hsl(var(--muted)/0.2)] transition-colors"
            v-for="(genre, index) in genres"
            :key="genre.genre"
          >
            <TableCell>#{{ index + 1 }}</TableCell>
            <TableCell class="truncate max-w-[150px]">{{ genre.genre }}</TableCell>
            <TableCell class="truncate max-w-[150px]" v-if="!store.isMobile">{{ genre.avgFollowers.toLocaleString('de-DE') || 'N/A' }}</TableCell>
            <TableCell>
              <AnimatedCircularProgressBar
              :max="100"
              :min="0"
              :value="genre.percentage"
              class="h-12 w-12 text-[12px]"
              />
            </TableCell>
            <TableCell class="truncate max-w-[150px]" v-if="!store.isMobile">
              <Progress
                :model-value="genre.avgPopularity"
                class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </section>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import DonutChart from '@/components/ui/chart-donut/DonutChart.vue';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AnimatedCircularProgressBar from '@/components/ui/animated-circular-progressbar/AnimatedCircularProgressBar.vue';
import Progress from '@/components/ui/progress/Progress.vue';

const store = spotyStore();

const donutData = computed(() => {
  if (!store.genres || store.genres.length === 0) return [];
  return store.genres.map(g => ({
    name: g.genre,
    total: g.percentage
  }));
});
const genres = computed(() => store.genres || []);

function valueFormatter(val: number) {
  return `${val.toFixed(1)}%`;
}
</script>