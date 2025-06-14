<template>
  <div>
    <MusicBar></MusicBar>
    <div class="flex gap-20 items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <RippleButton 
              @click="playPrevious"
              class="w-14 h-14 bg-transparent border-2 border-white/30 rounded-full flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <i class="pi pi-step-backward"></i>
            </RippleButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Previous</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>  
            <RippleButton 
              @click="togglePlay" 
              class="w-14 h-14 bg-transparent border-2 border-white/30 rounded-full flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <i :class="isPlaying ? 'pi pi-pause' : 'pi pi-play'"></i>
            </RippleButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Play</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>  
            <RippleButton 
              @click="playNext"
              class="w-14 h-14 bg-transparent border-2 border-white/30 rounded-full flex items-center justify-center transition-transform duration-200 ease-in-out hover:scale-110"
            >
              <i class="pi pi-step-forward"></i>
            </RippleButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Next</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
  
    </div>
  </div>
</template>

<script setup>
import { spotyStore } from '@/SpotifyStore/spotyStore';
import { storeToRefs } from 'pinia';
import RippleButton from '@/components/ui/ripple-button/RippleButton.vue';
import MusicBar from './musicBar/MusicBar.vue';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const store = spotyStore();
const { isPlaying, trackShowing, tracks } = storeToRefs(store);

async function togglePlay() {
  if (!trackShowing.value?.uri) {
    if (tracks.value?.items?.length > 0) {
      await store.playTrack(tracks.value.items[0].uri);
    }
    return;
  }

  const state = await store.player.getCurrentState();
  if (!state) {
    await store.playTrack(trackShowing.value.uri);
    return;
  }

  await store.togglePlayback();
}

async function playNext() {
  if (!tracks.value?.items) return;
  
  const currentIndex = tracks.value.items.findIndex(
    track => track.id === trackShowing.value?.id
  );
  
  if (currentIndex === -1 || currentIndex === tracks.value.items.length - 1) {
    await store.playTrack(tracks.value.items[0].uri);
  } else {
    await store.playTrack(tracks.value.items[currentIndex + 1].uri);
  }
}

async function playPrevious() {
  if (!tracks.value?.items) return;
  
  const currentIndex = tracks.value.items.findIndex(
    track => track.id === trackShowing.value?.id
  );
  
  if (currentIndex === -1 || currentIndex === 0) {
    await store.playTrack(tracks.value.items[tracks.value.items.length - 1].uri);
  } else {
    await store.playTrack(tracks.value.items[currentIndex - 1].uri);
  }
}
</script>
