<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
        <button v-if="!store.token" @click="loginWithSpotify" class="bg-green-500 text-white px-4 py-2 rounded">
            Iniciar sesión con Spotify
        </button>
    </div>
</template>
<script setup>
import { loginWithSpotify } from "../../auth";
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { spotyStore } from '../../SpotifyStore/spotyStore';

const router = useRouter();
const store = spotyStore();

onMounted(async () => {
  if (window.location.hash.includes("access_token")) {
    await store.getAccessTokenFromUrl();

    router.replace("/overview");
  }
});
</script>