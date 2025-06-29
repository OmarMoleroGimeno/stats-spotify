<template>
  <section
    id="how-it-works"
    class="w-full py-12 md:py-24 lg:py-32"
    ref="animations"
  >
    <div
      class="container px-4 md:px-6 mx-auto"
      v-if="isVisible"
    >
      <div class="flex flex-col items-center justify-center space-y-4 text-center max-w-[900px] mx-auto animate__animated animate__zoomInDown">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Cómo funciona</h2>
        <p class="text-gray-300 md:text-xl lg:text-base xl:text-xl leading-relaxed">
            En solo 3 pasos simples, tendrás acceso a todas tus estadísticas musicales personalizadas.
        </p>
      </div>

      <!-- Pasos con líneas -->
      <div class="relative mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3 lg:gap-12 items-center">

        <!-- Paso 1 -->
        <div class="relative z-10 flex flex-col items-center space-y-4 text-center animate__animated animate__fadeInUp" :style="{ animationDelay: '1s' }">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">1</div>
          <h3 class="text-xl font-bold">Conecta tu cuenta</h3>
          <p class="text-gray-300">Autoriza de forma segura el acceso a tu cuenta de Spotify con un solo clic.</p>
        </div>

        <!-- Paso 2 -->
        <div class="relative z-10 flex flex-col items-center space-y-4 text-center animate__animated animate__fadeInDown" :style="{ animationDelay: '1s' }">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">2</div>
          <h3 class="text-xl font-bold">Procesamos tus datos</h3>
          <p class="text-gray-300">Analizamos tu historial de reproducción y generamos estadísticas detalladas.</p>
        </div>

        <!-- Paso 3 -->
        <div class="relative z-10 flex flex-col items-center space-y-4 text-center animate__animated animate__fadeInUp" :style="{ animationDelay: '1s' }">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-[#9b22b6] font-bold text-xl">3</div>
          <h3 class="text-xl font-bold">Explora tus stats</h3>
          <p class="text-gray-300">Disfruta de visualizaciones interactivas y descubre insights sobre tu música.</p>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import TextGenerateEffect from '@/components/ui/text-generate-effect/TextGenerateEffect.vue';

const isVisible = ref(false);
const animations = ref(null);
let observer1;

onMounted(() => {
  observer1 = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer1.disconnect();
      }
    },
    { threshold: 0.1 }
  );

  if (animations.value) {
    observer1.observe(animations.value);
  }
});

onBeforeUnmount(() => {
  if (observer1) observer1.disconnect();
});
</script>
