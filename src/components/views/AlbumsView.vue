<template>
  <section class="flex flex-col items-center justify-center space-y-12 mt-32">
    <h1 class="text-[50px] whitespace-nowrap">Top Albums</h1>

    <transition name="fade" mode="out-in">
      <div 
        :key="albumImageUrl"
        class="border-4 border-white max-w-5xl w-full"
      >
        <div 
          class="flex flex-col md:flex-row transition-colors duration-500 relative" 
          :style="{ backgroundColor: bgColor, color: textColor }"
        >
          <!-- Aquí sigue tu contenido tal cual -->
          <!-- Imagen con gradiente dinámico según pantalla -->
          <div class="relative w-full md:w-[500px] flex-shrink-0">
            <img 
              ref="albumCover"
              :src="albumImageUrl" 
              class="w-full h-full object-cover"
              @load="extractColors"
              crossorigin="anonymous"
            >
            <!-- Gradientes -->
            <div class="absolute bottom-0 left-0 w-full h-32 md:hidden pointer-events-none"
              :style="{ background: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, ${bgColor} 100%)` }"
            ></div>
            <div class="absolute top-0 right-0 w-32 h-full hidden md:block pointer-events-none"
              :style="{ background: `linear-gradient(to left, ${bgColor} 0%, rgba(0,0,0,0) 100%)` }"
            ></div>
          </div>
          <!-- Texto del álbum -->
          <div class="flex flex-col p-6 flex-1">
            <h2 class="text-3xl font-bold">{{ albumTitle }}</h2>
            <p class="text-lg mt-2">{{ albumArtist }}</p>
            <div class="w-full h-[2px] bg-white/30 my-3" :style="{ background: convertToRGBA(textColor, 0.3) }"></div>

            <div
              v-if="albumTraks.items.length > 0"
              class="mb-4 overflow-auto max-h-64 md:max-h-64 md:flex md:flex-wrap md:gap-x-6 md:gap-y-2 custom-scroll"
            >
              <ol class="list-none md:flex md:flex-wrap p-0 m-0 w-full max-w-[470px]">
                <li
                  v-for="(track, index) in albumTraks.items"
                  :key="track.id"
                  class="flex space-x-3 w-full md:w-[calc(50%-1.5rem)]"
                >
                  <span class="font-semibold w-6 text-right">{{ index + 1 }}.</span>
                  <span class="truncate block max-w-full" :title="track.name">{{ track.name }}</span>
                </li>
              </ol>
            </div>

            <div class="flex flex-col items-end space-y-1 absolute bottom-4 right-4"
              :style="{ color: textColor }"
            >
              <p>Release Date: {{ albumReleaseDate }}</p>
              <p>Album length: {{ albumLength }}</p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="w-full">
      <Carousel
      class="relative w-full max-w-4xl mx-auto"
      :opts="{
        align: 'start',
        slidesToScroll: 3
      }"
      >
        <CarouselContent>
          <CarouselItem v-for="(album, index) in albums" :key="index" class="md:basis-1/2 lg:basis-1/3 relative p-8"
          :class="{ 'cursor-grabbing': isDragging, 'cursor-grab': !isDragging }"
          @mousedown="isDragging = true"
          @mouseup="isDragging = false"
          @mouseleave="isDragging = false">
            <div class="p-1">
              <Card
                class="cursor-pointer transform transition-transform duration-300 hover:scale-110 z-30"
                @click="store.getAlbumDetails(album.id)"
              >
                <CardContent
                  class="flex aspect-square items-center justify-center p-6 bg-cover bg-center rounded-xl overflow-hidden"
                  :style="{ backgroundImage: `url(${album.images[0]?.url})` }"
                >
                <div class="absolute inset-0 bg-black bg-opacity-20"></div>
                  <span class="text-xl font-semibold text-white drop-shadow-lg absolute top-4 left-8">
                    #{{ index + 1 }}
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { FastAverageColor } from 'fast-average-color';
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const store = spotyStore();

const isDragging = ref(false)

const albumImageUrl = computed(() => store?.albumShowing?.images?.[0]?.url);
const albumTitle = computed(() => store?.albumShowing?.name || '');
const albumArtist = computed(() => store?.albumShowing?.artists?.[0]?.name || '');
const albumReleaseDate = computed(() => store?.albumShowing?.release_date || '');
const albumLength = computed(() => store?.albumShowing?.albumLength || '');
const albumTraks = computed(() => store?.albumShowing?.tracks || { items: [] });
const albums = computed(() => store?.albums || '');

const albumCover = ref(null);
const bgColor = ref('rgba(255, 255, 255, 0.1)');
const textColor = ref('#ffffff');

function convertToRGBA(hex, opacity) {
  let r = 0, g = 0, b = 0;

  if (hex.length === 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function extractColors() {
  if (!albumCover.value) return;

  const fac = new FastAverageColor();

  fac.getColorAsync(albumCover.value)
    .then(color => {
      bgColor.value = color.rgba;
      textColor.value = color.isDark ? '#ffffff' : '#000000';
    })
    .catch(e => console.error('Error extracting color:', e));
}

watch(albumImageUrl, () => {
  bgColor.value = 'rgba(255, 255, 255, 0.1)';
  textColor.value = '#ffffff';
});
</script>
<style>
.custom-scroll::-webkit-scrollbar {
  width: 6px;               /* ancho estrecho */
}

.custom-scroll::-webkit-scrollbar-track {
  background: transparent;  /* sin fondo */
}

.custom-scroll::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3); /* solo el "thumb" visible */
  border-radius: 4px;
}

.custom-scroll:hover::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5); /* más visible al hacer hover */
}

.custom-scroll {
  scrollbar-width: thin;             /* Firefox */
  scrollbar-color: rgba(255,255,255,0.3) transparent;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave-from {
  opacity: 1;
}
</style>