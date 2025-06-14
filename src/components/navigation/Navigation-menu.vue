<template>
    <nav class="flex flex-row space-x-[30px] bg-customGray px-[28px] py-[10px] rounded-full border-b-[2px] border-customGreen">
      <a v-for="(data, index) in userData" 
        :key="index" 
        @click="redirect(index, data)"
        :class="selected === index ? 'text-customGreen underline' : 'text-white no-underline'"
        class="text-lg cursor-pointer hover:underline transition-colors duration-200">
        {{ data }}
    </a>
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

// Sincronizar selected con la ruta actual:
function syncSelectedWithRoute() {
  const currentPath = route.path.toLowerCase()
  // Buscar índice según path, quitando barra inicial
  const index = userData.findIndex(d => `/${d.toLowerCase()}` === currentPath)
  if (index !== -1) selected.value = index
  else selected.value = 0  // fallback si no encuentra
}

onMounted(syncSelectedWithRoute)

// También hacer watch por si cambia ruta sin hacer click (back/forward)
watch(() => route.path, () => {
  syncSelectedWithRoute()
})
</script>
