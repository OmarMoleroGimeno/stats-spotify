<template>
    <section class="flex flex-col items-center justify-center my-32">
        <h1 class="text-[50px] whitespace-nowrap mb-20">Top Songs</h1>
        <div class="flex flex-row justify-center items-center gap-12">
            <div class="h-full max-w-[535px] p-4 border-2 border-white/30 backdrop-blur-sm rounded-[20px]">
                <Turntables></Turntables>
                <MusicPlayer class="pt-4"></MusicPlayer>
                <div class="pt-10 space-y-3">
                    <div class="grid grid-cols-[120px_1fr] items-center gap-2">
                    <p class="text-lg">Song:</p>
                    <h2 class="text-lg truncate overflow-hidden whitespace-nowrap">
                        {{ store.trackShowing.name }}
                    </h2>
                    </div>

                    <div class="grid grid-cols-[120px_1fr] items-center gap-2">
                    <p class="text-lg">Album:</p>
                    <p class="text-lg truncate overflow-hidden whitespace-nowrap">
                        {{ store.trackShowing.album?.name }}
                    </p>
                    </div>

                    <div class="grid grid-cols-[120px_1fr] items-start gap-2">
                    <p class="text-lg">
                        {{ store.trackShowing.album?.artists?.length > 1 ? "Artists:" : "Artist:" }}
                    </p>
                    <div class="flex flex-wrap gap-x-2">
                        <span
                        class="text-lg truncate overflow-hidden whitespace-nowrap"
                        v-for="(artist, index) in store.trackShowing.album?.artists"
                        :key="artist.id || index"
                        >
                        {{ artist.name }}<span v-if="index < store.trackShowing.album.artists.length - 1">,</span>
                        </span>
                    </div>
                    </div>

                    <div class="grid grid-cols-[120px_1fr] items-center gap-2">
                    <p class="text-lg">Release date:</p>
                    <div class="flex items-center gap-2">
                        <span>{{ store.trackShowing.album?.release_date }}</span>
                        <i class="pi pi-calendar"></i>
                    </div>
                    </div>

                    <div class="grid grid-cols-[120px_1fr] items-center gap-2">
                    <p class="text-lg">Popularity:</p>
                    <Progress :model-value="store?.trackShowing?.popularity" class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]"/>
                    </div>
                </div>
            </div>
            <div v-if="store.tracks.items" class="flex items-center justify-center">
                <AnimateGrid :cards="cards">
                    <template #logo="{ logo, index }">
                        <div @click="selectTrackByIndex(index)" class="cursor-pointer">
                        <img class="logo mx-auto h-auto w-16" :src="logo" />
                        </div>
                    </template>
                </AnimateGrid>
            </div>
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

const store = spotyStore();
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