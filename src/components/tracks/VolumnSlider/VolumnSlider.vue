<template>
  <div class="flex gap-2 items-center">
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.46968 1.05085C7.64122 1.13475 7.75 1.30904 7.75 1.5V13.5C7.75 13.691 7.64122 13.8653 7.46968 13.9492C7.29813 14.0331 7.09377 14.0119 6.94303 13.8947L3.2213 11H1.5C0.671571 11 0 10.3284 0 9.5V5.5C0 4.67158 0.671573 4 1.5 4H3.2213L6.94303 1.10533C7.09377 0.988085 7.29813 0.966945 7.46968 1.05085ZM6.75 2.52232L3.69983 4.89468C3.61206 4.96294 3.50405 5 3.39286 5H1.5C1.22386 5 1 5.22386 1 5.5V9.5C1 9.77615 1.22386 10 1.5 10H3.39286C3.50405 10 3.61206 10.0371 3.69983 10.1053L6.75 12.4777V2.52232ZM10.2784 3.84804C10.4623 3.72567 10.7106 3.77557 10.833 3.95949C12.2558 6.09798 12.2558 8.90199 10.833 11.0405C10.7106 11.2244 10.4623 11.2743 10.2784 11.1519C10.0944 11.0296 10.0445 10.7813 10.1669 10.5973C11.4111 8.72728 11.4111 6.27269 10.1669 4.40264C10.0445 4.21871 10.0944 3.97041 10.2784 3.84804ZM12.6785 1.43044C12.5356 1.2619 12.2832 1.24104 12.1147 1.38386C11.9462 1.52667 11.9253 1.77908 12.0681 1.94762C14.7773 5.14488 14.7773 9.85513 12.0681 13.0524C11.9253 13.2209 11.9462 13.4733 12.1147 13.6161C12.2832 13.759 12.5356 13.7381 12.6785 13.5696C15.6406 10.0739 15.6406 4.92612 12.6785 1.43044Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    <input
    type="range"
    min="0"
    max="100"
    step="1"
    :value="volumePercent"
    @input="onSliderChange"
    class="green-slider-vertical"
    :style="{
      '--value': volumePercent,
      '--max': 100
    }"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { spotyStore } from '../../../SpotifyStore/spotyStore';

const store = spotyStore();

const volumePercent = computed(() => Math.round(store.volume * 100));

function onSliderChange(event) {
  const val = Number(event.target.value);
  store.setVolume(val / 100);
}
</script>

<style scoped>
.green-slider-vertical {
  --value: 0;
  --max: 100;

  /* Rotamos el slider */
  width: 100px; /* largo del slider */
  height: 3px;
  -webkit-appearance: none;
  background: #d3d3d3;
  border-radius: 1px;
  outline: none;
}

.green-slider-vertical::-webkit-slider-runnable-track {
  height: 3px;
  background: linear-gradient(
    to right,
    #22c55e 0%,
    #22c55e calc((100% * var(--value)) / var(--max)),
    #d3d3d3 calc((100% * var(--value)) / var(--max)),
    #d3d3d3 100%
  );
  border-radius: 3px;
}

.green-slider-vertical::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 14px;
  height: 14px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #16a34a;
  margin-top: -5px;
  transition: background-color 0.3s ease;
}

.green-slider-vertical::-webkit-slider-thumb:hover {
  background: #16a34a;
}

/* Firefox */
.green-slider-vertical::-moz-range-track {
  height: 3px;
  background: #d3d3d3;
  border-radius: 3px;
}

.green-slider-vertical::-moz-range-thumb {
  width: 18px;
  height: 18px;
  background: #22c55e;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid #16a34a;
  transition: background-color 0.3s ease;
}

.green-slider-vertical::-moz-range-thumb:hover {
  background: #16a34a;
}
</style>
