<template>
    <section class="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 flex items-center relative">
        <div class="container px-4 md:px-6 mx-auto">
        <div class="flex flex-col items-center space-y-4 text-center">
            <div class="space-y-2 max-w-[1000px]">
            <span class="inline-block border border-green-500 text-green-400 rounded-full px-3 py-1 text-sm font-semibold">
                Conecta con Spotify
            </span>
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl leading-none">
                Descubre tus <span class="text-green-400">estadísticas musicales</span>
            </h1>
            <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl leading-non">
                como
                <TextHighlight class="bg-gradient-to-br from-[#9b22b6] to-[#c77dff]">
                nunca antes
                </TextHighlight>
            </h1>
            <p class="text-gray-300 md:text-xl">
                Obtén insights profundos sobre tu música favorita, artistas más escuchados, géneros preferidos y mucho más con nuestras estadísticas personalizadas de Spotify.
            </p>
            </div>
        </div>
        </div>
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <a href="#solicitar-acceso" aria-label="Ir a cómo funciona" class="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <!-- <span class="text-green-400">Scroll down</span> -->
        </a>
        </div>
    </section>
</template>
<script setup lang="ts">
import TextHighlight from '@/components/ui/text-highlight/TextHighlight.vue';

</script>