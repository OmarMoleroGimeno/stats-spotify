<template>
  <section class="relative z-10 pt-24">
      <Festival />
  </section>
</template>

<script setup>
import Festival from '../festival/Festival.vue';
import { spotyStore } from '../../SpotifyStore/spotyStore.js';

const store = spotyStore();
</script>
