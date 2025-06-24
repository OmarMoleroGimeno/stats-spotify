<template>
  <div
    class="relative w-full max-w-[500px] aspect-square bg-neutral-800 flex justify-center items-center rounded-[20px] shadow-2xl mx-auto"
  >
    <!-- Slider -->
    <VolumnSlider v-if="store?.userProfile?.product === 'premium'" class="absolute bottom-2 left-2 md:bottom-4 md:left-4" />

    <!-- Vinilo giratorio -->
    <div
      ref="vinylRef"
      :style="{ transform: `rotate(${rotation}deg)` }"
      class="w-[80%] h-[80%] max-w-[400px] max-h-[400px]"
    >
      <transition name="vinyl-transition" mode="out-in">
        <div :key="track.id" class="w-full h-full bg-black rounded-full relative">
          <!-- Anillos del vinilo -->
          <div class="absolute inset-0 rounded-full border-[5px] border-white/40"></div>
          <div class="absolute inset-8 rounded-full border-[3px] border-white/20"></div>
          <div class="absolute inset-16 rounded-full border-[1px] border-white/10"></div>

          <!-- Imagen del álbum -->
          <img
            v-if="store.trackShowing?.album"
            :src="track.album.images[0].url"
            alt="Album"
            class="absolute top-1/2 left-1/2 w-20 h-20 md:w-32 md:h-32 rounded-full object-cover transform -translate-x-1/2 -translate-y-1/2 z-10"
          />
          <div class="absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
        </div>
      </transition>
    </div>

    <!-- Botones -->
    <div class="absolute bottom-4 right-16 bg-green-500 w-6 h-6 md:w-8 md:h-8 rounded-full"></div>
    <div class="absolute bottom-4 right-4 bg-red-500 w-6 h-6 md:w-8 md:h-8 rounded-full"></div>
  </div>
</template>


<script setup>
import { spotyStore } from '../../../SpotifyStore/spotyStore';
import { computed, ref, watch, onMounted, onBeforeUnmount } from 'vue';
import VolumnSlider from '../VolumnSlider/VolumnSlider.vue';

const store = spotyStore();
const track = computed(() => store.trackShowing);

const vinylRef = ref(null);
const rotation = ref(0); // grados de rotación actuales
let animationFrameId = null;
let lastTimestamp = null;

function animate(timestamp) {
  if (!lastTimestamp) lastTimestamp = timestamp;
  const delta = timestamp - lastTimestamp;
  lastTimestamp = timestamp;

  // Velocidad: 360 grados cada 5 segundos => 360/5000 grados por ms
  const degreesPerMs = 360 / 5000;
  rotation.value = (rotation.value + degreesPerMs * delta) % 360;

  if (store.isPlaying) {
    animationFrameId = requestAnimationFrame(animate);
  }
}

// Reacciona a isPlaying para arrancar o detener animación
watch(() => store.isPlaying, (playing) => {
  if (playing) {
    lastTimestamp = null;
    animationFrameId = requestAnimationFrame(animate);
  } else {
    // Pausamos, cancelamos animación
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  }
});

// Al montar, si ya está reproduciendo, arrancamos animación
onMounted(() => {
  if (store.isPlaying) {
    animationFrameId = requestAnimationFrame(animate);
  }
});

onBeforeUnmount(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
});
</script>

<style scoped>
.vinyl-transition-enter-from {
  opacity: 0;
  transform: translateY(-100%);
}
.vinyl-transition-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.vinyl-transition-leave-from {
  opacity: 1;
  transform: translateX(0);
}
.vinyl-transition-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
.vinyl-transition-enter-active,
.vinyl-transition-leave-active {
  transition: all 0.6s ease;
}
</style>
