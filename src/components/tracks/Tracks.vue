<template>
  <div
    class="relative flex flex-col w-full max-w-[29.5rem] justify-start items-center overflow-hidden rounded-2xl border-2 border-white/30 backdrop-blur-sm shadow-[0_0_20px_#1DB95466] px-4 md:px-0"
  >
    <div class="p-6 rounded-2xl w-full">
      <!-- Imágenes de los 3 primeros artistas -->
      <div class="relative flex md:flex-row items-center justify-center gap-4 mb-6">
        <!-- Segundo lugar -->
        <img
          v-if="store.tracks?.items?.[1].album"
          :src="store.tracks.items[1].album.images[0]?.url"
          class="h-16 w-16 md:h-24 md:w-24 rounded-sm object-cover border-2 border-white/40 shadow-md"
          alt="2nd track"
        />
        <!-- Primer lugar -->
        <img
          v-if="store.tracks?.items?.[0].album"
          :src="store.tracks.items[0].album.images[0]?.url"
          class="h-24 w-24 md:h-32 md:w-32 z-10 rounded-sm object-cover border-2 border-white shadow-lg"
          alt="Top track"
        />
        <!-- Tercer lugar -->
        <img
          v-if="store.tracks?.items?.[2].album"
          :src="store.tracks.items[2].album.images[0]?.url"
          class="h-16 w-16 md:h-24 md:w-24 rounded-sm object-cover border-2 border-white/40 shadow-md"
          alt="3rd track"
        />
      </div>

      <!-- Lista Top 10 -->
      <ul class="w-full divide-y divide-white/20">
        <li
          v-for="(track, index) in store.tracks?.items?.slice(0, 10)"
          :key="track.id"
          class="flex items-center py-2 md:py-3 text-white"
        >
          <span class="w-6 text-base md:text-lg font-bold opacity-80">{{ index + 1 }}.</span>

          <img
            :src="track.album.images[0].url"
            class="ml-4 h-8 w-8 md:h-10 md:w-10 z-10 rounded-sm object-cover"
            alt="image artist"
          />

          <div class="flex flex-col items-start ml-4">
            <HoverCard>
              <HoverCardTrigger as-child>
                <Button variant="link" class="text-base md:text-lg text-white" @click="openTrack(track.external_urls.spotify)">
                  {{ track.name }}
                </Button>
              </HoverCardTrigger>
              <HoverCardContent class="w-full bg-black/60 backdrop-blur-md border border-gray-500 text-white">
                <div class="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage :src="track.album.images[0].url" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div class="space-y-1">
                    <h4 class="text-sm font-semibold">
                      Album
                    </h4>
                    <p class="text-sm">
                      {{ track.album.name }}
                    </p>
                    <div class="flex items-center pt-2">
                      <CalendarIcon class="mr-2 h-4 w-4 opacity-70" />
                      <span class="text-xs text-muted-foreground">
                        {{ track.album.release_date }}
                      </span>
                    </div>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
            <span class="pl-4 text-xs md:text-sm text-white/60">
              {{ track.artists.map(a => a.name).join(' / ') }}
            </span>
          </div>
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
import { CalendarIcon } from 'lucide-vue-next';
import {Avatar,AvatarFallback,AvatarImage} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {HoverCard,HoverCardContent,HoverCardTrigger} from '@/components/ui/hover-card';

const store = spotyStore();

function openTrack(uri) {
  window.open(uri);
}
</script>