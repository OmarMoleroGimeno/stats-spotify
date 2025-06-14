<template>
  <div class="w-full">
    <input 
      type="range" 
      min="0" 
      :max="duration" 
      :value="position"
      @input="onSeek($event)"
      class="w-full green-slider"
      :style="{
        '--value': position,
        '--max': duration
      }"
    />
    <div class="flex justify-between text-sm text-gray-400 mt-2">
      <span>{{ formatTime(position) }}</span>
      <span>{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>

<script setup>
import { watch, onUnmounted, onMounted } from 'vue';
import { spotyStore } from '@/SpotifyStore/spotyStore';
import { storeToRefs } from 'pinia';

const store = spotyStore();
const { position, duration, isPlaying } = storeToRefs(store);

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function onSeek(event) {
  const newPosition = Number(event.target.value);
  store.seekTo(newPosition);
}

let intervalId = null;
let correctionIntervalId = null;

// función separada para iniciar los intervalos
function startIntervals() {
  let lastUpdate = Date.now();

  intervalId = setInterval(() => {
    const now = Date.now();
    store.position += now - lastUpdate;
    lastUpdate = now;
  }, 200);

  correctionIntervalId = setInterval(async () => {
    const state = await store.player.getCurrentState();
    if (state) {
      store.position = state.position;
      store.duration = state.duration;
    }
  }, 5000);
}

// función separada para limpiar
function clearIntervals() {
  clearInterval(intervalId);
  clearInterval(correctionIntervalId);
  intervalId = null;
  correctionIntervalId = null;
}

// escuchamos cambios en isPlaying
watch(isPlaying, (playing) => {
  if (playing) {
    startIntervals();
  } else {
    clearIntervals();
  }
});

// limpiar al desmontar el componente
onUnmounted(() => {
  clearIntervals();
});

// importante: si el componente carga y ya está reproduciendo, arrancamos:
onMounted(() => {
  if (isPlaying.value) {
    startIntervals();
  }
});

</script>

<style scoped>
.green-slider {
  --value: 0;
  --max: 100;
}

/* Añade aquí el CSS anterior */
input[type="range"].green-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 6px;
  background: #d3d3d3;
  border-radius: 3px;
  outline: none;
}

input[type="range"].green-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #16a34a;
  margin-top: -6px;
  transition: background-color 0.3s ease;
}

input[type="range"].green-slider::-webkit-slider-thumb:hover {
  background: #16a34a;
}

input[type="range"].green-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #16a34a;
  transition: background-color 0.3s ease;
}

input[type="range"].green-slider::-moz-range-thumb:hover {
  background: #16a34a;
}

input[type="range"].green-slider::-webkit-slider-runnable-track {
  height: 6px;
  background: linear-gradient(
    to right,
    #22c55e 0%,
    #22c55e calc((100% * var(--value)) / var(--max)),
    #d3d3d3 calc((100% * var(--value)) / var(--max)),
    #d3d3d3 100%
  );
  border-radius: 3px;
}

input[type="range"].green-slider::-moz-range-track {
  height: 6px;
  background: #d3d3d3;
  border-radius: 3px;
}
</style>

