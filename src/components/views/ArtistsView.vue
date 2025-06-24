<template>
  <section class="flex flex-col items-center justify-center space-y-12 mt-24 mdx:mt-32">
    <h1 class="text-[50px] whitespace-nowrap">Top Artists</h1>
    <div class="w-full max-w-[80vw] space-y-24 flex justify-center flex-col items-center">
      <Carousel class="max-w-[70vw] mx-auto" v-if="!store.isMobile && !store.isLaptop" :opts="{ align: 'start', slidesToScroll: 3 }">
        
      <div class="pointer-events-none absolute top-0 left-0 h-full w-10 z-40 bg-gradient-to-r from-black to-transparent"></div>
      <div class="pointer-events-none absolute top-0 right-0 h-full w-10 z-40 bg-gradient-to-l from-black to-transparent"></div>
        <CarouselContent class="cursor-grab">
          <CarouselItem
                v-for="(artist, index) in store.artists.items"
                :key="artist.id || index"
                class="p-4 pl-8 basis-[40%] lg:basis-[20%]"

                >
                <FlipCard>
                    <template #default>
                    <div class="relative w-full h-full md:h-72 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        :src="artist.images[0]?.url"
                        class="w-full h-full object-cover"
                        :alt="artist.name"
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                    <div class="absolute top-2 right-2 text-white font-bold text-lg bpx-2 py-1 rounded-md select-none">
                        #{{ index + 1 }}
                    </div>
                    <div class="absolute bottom-4 left-4 text-xl font-bold text-white">
                        {{ artist.name }}
                    </div>
                    </template>
                    <template #back>
                    <div class="flex min-h-full flex-col gap-2 p-4">
                        <h1 class="text-xl font-bold text-white">{{ artist.name }}</h1>
                        <p
                        class="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100"
                        >
                        Followers: {{ artist.followers.total.toLocaleString('de-DE') || 'N/A' }}
                        </p>
                    </div>
                    </template>
                </FlipCard>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel class="max-w-[70vw] mx-auto" v-if="store.isLaptop &&  !store.isMobile" :opts="{ align: 'start', slidesToScroll: 2 }">
        
      <div class="pointer-events-none absolute top-0 left-0 h-full w-10 z-40 bg-gradient-to-r from-black to-transparent"></div>
      <div class="pointer-events-none absolute top-0 right-0 h-full w-10 z-40 bg-gradient-to-l from-black to-transparent"></div>
        <CarouselContent class="cursor-grab">
          <CarouselItem
                v-for="(artist, index) in store.artists.items"
                :key="artist.id || index"
                class="p-4 pl-8 basis-[40%]"

                >
                <FlipCard>
                    <template #default>
                    <div class="relative w-full h-full md:h-72 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        :src="artist.images[0]?.url"
                        class="w-full h-full object-cover"
                        :alt="artist.name"
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                    <div class="absolute top-2 right-2 text-white font-bold text-lg bpx-2 py-1 rounded-md select-none">
                        #{{ index + 1 }}
                    </div>
                    <div class="absolute bottom-4 left-4 text-xl font-bold text-white">
                        {{ artist.name }}
                    </div>
                    </template>
                    <template #back>
                    <div class="flex min-h-full flex-col gap-2 p-4">
                        <h1 class="text-xl font-bold text-white">{{ artist.name }}</h1>
                        <p
                        class="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100"
                        >
                        Followers: {{ artist.followers.total.toLocaleString('de-DE') || 'N/A' }}
                        </p>
                    </div>
                    </template>
                </FlipCard>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Carousel
        v-if="store.isMobile"
        class="w-full max-w-xs mx-auto"
        :opts="{ align: 'center', slidesToScroll: 1 }"
      >
        
      <div class="pointer-events-none absolute top-0 left-0 h-full w-10 z-40 bg-gradient-to-r from-black to-transparent"></div>
      <div class="pointer-events-none absolute top-0 right-0 h-full w-10 z-40 bg-gradient-to-l from-black to-transparent"></div>
        <CarouselContent class="cursor-grab">
          <CarouselItem
                v-for="(artist, index) in store.artists.items"
                :key="artist.id || index"
                class="p-4 pl-[4rem] basis-[300px]"
                >
                <FlipCard>
                    <template #default>
                    <div class="relative w-full h-full md:h-72 lg:h-80 rounded-2xl overflow-hidden">
                      <img
                        :src="artist.images[0]?.url"
                        class="w-full h-full object-cover"
                        :alt="artist.name"
                      />
                      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
                    </div>
                    <div class="absolute top-2 right-2 text-white font-bold text-lg bpx-2 py-1 rounded-md select-none">
                        #{{ index + 1 }}
                    </div>
                    <div class="absolute bottom-4 left-4 text-xl font-bold text-white">
                        {{ artist.name }}
                    </div>
                    </template>
                    <template #back>
                    <div class="flex min-h-full flex-col gap-2 p-4">
                        <h1 class="text-xl font-bold text-white">{{ artist.name }}</h1>
                        <p
                        class="mt-1 border-t border-t-gray-200 py-4 text-base font-medium leading-normal text-gray-100"
                        >
                        Followers: {{ artist.followers.total.toLocaleString('de-DE') || 'N/A' }}
                        </p>
                    </div>
                    </template>
                </FlipCard>
            </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Table class="text-lg">
        <TableCaption>Top 50 artists</TableCaption>
        <TableHeader>
          <TableRow class="hover:bg-transparent">
            <TableHead>Rank</TableHead>
            <TableHead>Image</TableHead>
            <TableHead v-if="!store.isMobile">Name</TableHead>
            <TableHead v-if="!store.isMobile">Followers</TableHead>
            <TableHead v-if="!store.isMobile">Popularity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Dialog v-for="(artist, index) in store.artists.items" :key="artist.id">
            <DialogTrigger as-child>
              <TableRow
                class="hover:bg-[hsl(var(--muted)/0.2)] transition-colors cursor-pointer"
              >
              <TableCell>#{{ index + 1 }}</TableCell>
                <TableCell>
                  <img
                    :src="artist.images[0]?.url"
                    class="ml-4 h-10 w-10 z-10 rounded-full object-cover"
                    alt="image artist"
                  />
                </TableCell>
                <TableCell>{{ artist.name }}</TableCell>
                <TableCell v-if="!store.isMobile">{{ artist.followers.total.toLocaleString('de-DE') || 'N/A' }}</TableCell>
                <TableCell v-if="!store.isMobile"><Progress :model-value="artist.popularity" class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]" /></TableCell>
              </TableRow>
            </DialogTrigger>
            <DialogContent class="bg-transparent bg border-white/30 backdrop-blur-lg text-white">
              <FlickeringGrid
                class="absolute inset-0 z-0 [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
                :square-size="4"
                :grid-gap="6"
                color="#1DB954"
                :max-opacity="0.3"
                :flicker-chance="0.1"
                :width="800"
                :height="800"
              />
              <DialogHeader>
                <DialogTitle class="text-4xl text-center">{{ artist.name }}</DialogTitle>
                <DialogDescription class="text-white text-lg flex flex-col items-center justify-center gap-4 z-40 text-center">
                  <img
                    :src="artist.images[0]?.url"
                    class="h-72 w-72 rounded-sm object-cover"
                    alt="image artist"
                  />
                  <p>
                    Followers:
                    <span class="pl-2 font-medium">
                      {{ artist.followers.total.toLocaleString('de-DE') || 'N/A' }}
                    </span>
                  </p>
                  <p>
                    Genres:
                    <span v-if="artist.genres && artist.genres.length">
                      <span
                        class="pl-2 font-medium"
                        v-for="(genre, index) in artist.genres"
                        :key="genre"
                      >
                        {{ genre }}<span v-if="index < artist.genres.length - 1">, </span>
                      </span>
                    </span>
                    <span v-else class="pl-2 font-medium text-gray-400">
                      No genres available
                    </span>
                  </p>
                  <div class="w-full max-w-md z-40">
                    <p class="text-left mb-1">Popularity</p>
                    <Progress
                      :model-value="artist.popularity"
                      class="h-2 bg-muted/30 [&>div]:bg-[#1DB954]"
                    />
                    <p class="text-sm text-muted-foreground text-right mt-1">{{ artist.popularity }}/100</p>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div class="grid gap-4 py-4">
              </div>
            </DialogContent>
          </Dialog>
        </TableBody>
      </Table>
    </div>
  </section>
</template>

<script setup>
import { spotyStore } from '../../SpotifyStore/spotyStore.js';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import FlickeringGrid from '@/components/ui/flickering-grid/FlickeringGrid.vue';
import Progress from '@/components/ui/progress/Progress.vue';
import FlipCard from '@/components/ui/flip-card/FlipCard.vue';

const store = spotyStore();
</script>