<template>
  <!-- Burger -->
   <Transition name="slide-fade" appear>
    <div>
      <label class="burger absolute top-8 right-4 z-50" for="burger">
        <input type="checkbox" id="burger" class="hidden" v-model="open" />
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div class="profile-wrapper absolute top-4 left-4 z-50">
        <Profile v-if="store.userProfile.email" />
      </div>
    </div>
  </Transition>

  <!-- Slide-in menu -->
  <nav
    class="fixed top-0 right-0 h-full w-64 bg-black/70 backdrop-blur-md text-white z-40 transition-transform duration-500 transform"
    :class="open ? 'translate-x-0' : 'translate-x-full'"
  >
    <ul class="flex flex-col space-y-4 mt-24 px-6">
      <li v-for="(data, index) in userData" :key="index">
        <button
          :class="{
            'text-customGreen': selected === index,
            'text-white': selected !== index
          }"
          @click="redirect(index, data)"
          class="text-lg font-semibold hover:text-customGreen transition-colors"
        >
          {{ data }}
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { spotyStore } from '@/SpotifyStore/spotyStore.js';
import Profile from "@/components/profile/Profile.vue";

const userData = ['Overview', 'Artists', 'Songs', 'Albums', 'Genres', 'Festival']
const selected = ref(0);
const open = ref(false);
const router = useRouter();
const route = useRoute();
const store = spotyStore();

function redirect(index, data) {
  selected.value = index
  const path = `/${data.toLowerCase()}`
  router.push(path)
  open.value = false // Cierra el menú al hacer clic
}

function syncSelectedWithRoute() {
  const currentPath = route.path.toLowerCase()
  const index = userData.findIndex(d => `/${d.toLowerCase()}` === currentPath)
  selected.value = index !== -1 ? index : 0
}

onMounted(syncSelectedWithRoute)

watch(() => route.path, () => {
  syncSelectedWithRoute()
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
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

.burger {
  width: 40px;
  height: 30px;
  background: transparent;
  cursor: pointer;
  display: block;
  position: absolute;
  z-index: 50;
  overflow: visible;
}

.burger::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -20px;
  left: -20px;
  width: 80px;
  height: 80px;
  background: transparent;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  /* ✅ Suavizado del borde */
  mask-image: radial-gradient(circle at center,
    black 0%,
    black 30%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%);
  -webkit-mask-image: radial-gradient(circle at center,
    black 0%,
    black 30%,
    rgba(0, 0, 0, 0.6) 60%,
    rgba(0, 0, 0, 0.3) 80%,
    transparent 100%);

  pointer-events: none;
}


.burger input {
  display: none;
}

.burger span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: white;
  border-radius: 9px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.25s ease-in-out;
}

.burger span:nth-of-type(1) {
  top: 0px;
  transform-origin: left center;
}

.burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
  transform-origin: left center;
}

.burger span:nth-of-type(3) {
  top: 100%;
  transform: translateY(-100%);
  transform-origin: left center;
}

.burger input:checked ~ span:nth-of-type(1) {
  transform: rotate(45deg);
  top: 0px;
  left: 5px;
}

.burger input:checked ~ span:nth-of-type(2) {
  width: 0%;
  opacity: 0;
}

.burger input:checked ~ span:nth-of-type(3) {
  transform: rotate(-45deg);
  top: 28px;
  left: 5px;
}
</style>
