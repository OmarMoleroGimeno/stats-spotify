<template>
  <section class="flex flex-col items-center justify-center mt-32 px-4 sm:px-6">
    <h1 class="text-[32px] sm:text-[40px] md:text-[50px] whitespace-nowrap mb-10 sm:mb-16 md:mb-20">
      Top Songs
    </h1>

    <!-- Contenedor principal responsive -->
    <div class="flex flex-col lg:flex-row justify-center items-center gap-8 md:gap-12 w-full max-w-screen-xl">

      <!-- Izquierda: Turntable + info -->
      <div class="w-full max-w-[535px] p-4 border-2 border-white/30 backdrop-blur-sm rounded-[20px]">
        <Turntables />
        <MusicPlayer class="pt-4" />

        <div class="pt-10 space-y-4 text-sm sm:text-base">
          <!-- Song -->
          <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2">
            <p class="font-medium">Song:</p>
            <h2 class="truncate overflow-hidden whitespace-nowrap">
              {{ store.trackShowing.name }}
            </h2>
          </div>

          <!-- Album -->
          <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2">
            <p class="font-medium">Album:</p>
            <p class="truncate overflow-hidden whitespace-nowrap">
              {{ store.trackShowing.album?.name }}
            </p>
          </div>

          <!-- Artist(s) -->
          <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-start gap-2">
            <p class="font-medium">
              {{ store.trackShowing.album?.artists?.length > 1 ? "Artists:" : "Artist:" }}
            </p>
            <div class="flex flex-wrap gap-x-2">
              <span
                v-for="(artist, index) in store.trackShowing.album?.artists"
                :key="artist.id || index"
                class="truncate whitespace-nowrap"
              >
                {{ artist.name }}<span v-if="index < store.trackShowing.album.artists.length - 1">,</span>
              </span>
            </div>
          </div>

          <!-- Release date -->
          <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2">
            <p class="font-medium">Release date:</p>
            <div class="flex items-center gap-2">
              <span>{{ store.trackShowing.album?.release_date }}</span>
              <i class="pi pi-calendar"></i>
            </div>
          </div>

          <!-- Popularity -->
          <div class="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] items-center gap-2">
            <p class="font-medium">Popularity:</p>
            <Progress
              :model-value="store?.trackShowing?.popularity"
              class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]"
            />
          </div>
        </div>
      </div>

      <!-- Derecha: Logos -->
      <div
        v-if="store.tracks.items && !store.isMobile"
        class="w-full max-w-[500px] flex justify-center items-center"
      >
        <AnimateGrid :cards="cards">
          <template #logo="{ logo, index }">
            <div @click="selectTrackByIndex(index)" class="cursor-pointer">
              <img class="logo mx-auto h-auto w-16" :src="logo" />
            </div>
          </template>
        </AnimateGrid>
      </div>
    </div>
    <div class="mt-12 w-5/6">
        <Table class="text-lg">
            <TableCaption>Top 50 songs</TableCaption>
            <TableHeader>
                <TableRow class="hover:bg-transparent">
                    <TableHead>Rank</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Song</TableHead>
                    <TableHead v-if="!store.isMobile">Album</TableHead>
                    <TableHead v-if="!store.isMobile">Artists</TableHead>
                    <TableHead v-if="!store.isMobile">Release Date</TableHead>
                    <TableHead v-if="!store.isMobile">Popularity</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow
                    class="hover:bg-[hsl(var(--muted)/0.2)] transition-colors cursor-pointer"
                    v-for="(song, index) in songs"
                    @click="selectTrackByIndex(index)"
                >
                <TableCell>#{{ index + 1 }}</TableCell>
                    <TableCell>
                    <img
                        :src="song.album.images[0]?.url"
                        class="ml-4 h-10 w-10 z-10 rounded-full object-cover"
                        alt="image artist"
                    />
                    </TableCell>
                    <TableCell class="truncate max-w-[150px]">{{ song.name }}</TableCell>
                    <TableCell v-if="!store.isMobile" class="truncate max-w-[150px]">{{ song.album.name }}</TableCell>
                    <TableCell v-if="!store.isMobile" class="truncate max-w-[150px]">{{ song.artists.map(a => a.name).join(' / ') }}</TableCell>
                    <TableCell v-if="!store.isMobile" class="truncate max-w-[150px]">
                        <div class="flex items-center gap-2">
                            <span>{{ song.album.release_date }}</span>
                            <CalendarIcon class="h-4 w-4 opacity-70" />
                        </div>
                    </TableCell>
                    <TableCell v-if="!store.isMobile" class="truncate max-w-[150px]"><Progress :model-value="song.popularity" class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]" /></TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { spotyStore } from '../../SpotifyStore/spotyStore';
import AnimateGrid from '../ui/animate-grid/AnimateGrid.vue';
import Turntables from '../tracks/turntables/Turntables.vue';
import MusicPlayer from '../tracks/musicPlayer/MusicPlayer.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CalendarIcon } from 'lucide-vue-next';

const store = spotyStore();

const songs = computed(() => store?.tracks?.items || null);

const cards = computed(() =>
  store.tracks?.items?.map((item, index) => ({
    logo: item.album.images[0]?.url,
    index
  }))
);


async function selectTrackByIndex(index) {
    const track = store.tracks?.items?.[index];
    store.trackShowing = track;
    if (track?.uri) {
        await store.playTrack(track.uri);
    }
}

</script>