<template>
    <section id="mockups" class="w-full min-h-screen py-12 md:py-24 lg:py-32" ref="dispositivosWrapper">
        <div class="container px-4 md:px-6 mx-auto" v-if="isDispositivosVisible">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
              <div class="space-y-2 max-w-[1000px] animate__animated animate__bounceInDown">
              <h2  class="!text-2xl md:!text-4xl lg:!text-5xl font-bold tracking-tight">
                  Disponible en todos tus <span class="text-[#c77dff]">dispositivos</span>
              </h2>
              <p class="text-gray-300 md:text-xl mt-2">
                  Accede a tus estadísticas desde cualquier lugar, ya sea en tu móvil o computadora.
              </p>
              </div>
          </div>

          <!-- Contenedor para posicionar las imágenes -->
          <div class="relative flex justify-center mt-12 max-w-7xl mx-auto">
              <div class="flex items-center w-full">
              <!-- Datos clave -->
              <div class="w-1/3 pr-8 text-left space-y-6 animate__animated animate__bounceInLeft">
                  <h2 class="text-3xl font-semibold mb-4">Hecho para fans de la música</h2>
                  <p class="text-gray-400 text-lg">
                  ¿Escuchas música todo el día? ¿Cambias de artista cada semana? Esta app es para ti. Descubre cómo escuchas, qué géneros dominas, y cómo evoluciona tu gusto musical con el tiempo.
                  </p>
                  <p class="text-gray-400 text-lg">
                  Todo basado en tus propios datos de Spotify. Fácil, visual y 100% privado.
                  </p>
              </div>

              <!-- Imagen -->
              <img src="/mockups.webp" alt="Vista en computadora" class="h-auto max-h-[450px] w-2/3 object-contain animate__animated animate__bounceInRight" />
              </div>
          </div>
        </div>
    </section>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isDispositivosVisible = ref(false);
const dispositivosWrapper = ref(null);

let observer2;

onMounted(async () => {

  observer2 = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isDispositivosVisible.value = true;
        observer2.disconnect();
      }
    },
    { threshold: 0.1 }
  );
  if (dispositivosWrapper.value) observer2.observe(dispositivosWrapper.value);
});

onBeforeUnmount(() => {
  if (observer2) observer2.disconnect();
});

</script>