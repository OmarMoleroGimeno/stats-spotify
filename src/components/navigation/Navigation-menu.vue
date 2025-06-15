<template>
  <nav class="flex flex-row space-x-[30px] bg-customGray px-[28px] py-[10px] rounded-full border-b-[2px] border-customGreen relative">
    <div 
      v-for="(data, index) in userData" 
      :key="index" 
      @click="redirect(index, data)"
      class="relative cursor-pointer text-lg transition-colors duration-200"
    >
      <span :class="selected === index ? 'text-customGreen' : 'text-white hover:text-customGreen'">
        {{ data }}
      </span>
      <!-- Subrayado custom animado -->
      <div 
        class="absolute bottom-0 left-0 right-0 h-[3px] bg-customGreen rounded-full transition-transform duration-300"
        :class="selected === index ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'"
      ></div>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const userData = ['Overview', 'Artists', 'Songs', 'Albums', 'Genres', 'Festival']
const selected = ref(0)
const router = useRouter()
const route = useRoute()

function redirect(index, data) {
  selected.value = index
  const path = `/${data.toLowerCase()}`
  router.push(path)
}

function syncSelectedWithRoute() {
  const currentPath = route.path.toLowerCase()
  const index = userData.findIndex(d => `/${d.toLowerCase()}` === currentPath)
  if (index !== -1) selected.value = index
  else selected.value = 0
}

onMounted(syncSelectedWithRoute)

watch(() => route.path, () => {
  syncSelectedWithRoute();
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
</script>
