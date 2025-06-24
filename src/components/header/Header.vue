<template>
  <Transition
    name="slide-fade"
    appear
  >
    <section 
      v-show="isVisible"
      class="relative flex items-center justify-between px-8 py-6"
    >
      <!-- Select -->
      <TimeSelect />

      <!-- Navigation centrado absoluto -->
      <div class="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenu />
      </div>

      <!-- Botón alineado a la derecha -->
      <div>
        <Profile />
      </div>
    </section>
  </Transition>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavigationMenu from "../navigation/Navigation-menu.vue";
import Profile from "../profile/Profile.vue";
import { spotyStore } from "../../SpotifyStore/spotyStore.js";
import TimeSelect from './timeSelect/TimeSelect.vue'

const store = spotyStore();

const isVisible = ref(true);
let lastScroll = 0;

function handleScroll() {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScroll > lastScroll && currentScroll > 50) {
    isVisible.value = false;
  } else {
    isVisible.value = true;
  }

  lastScroll = currentScroll <= 0 ? 0 : currentScroll;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
}
</style>


