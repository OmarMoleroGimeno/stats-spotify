<template>
  <Popover v-model:open="isOpen">
    <PopoverTrigger as-child>
      <div
        :class="[
          'border border-customGreen rounded-full p-1 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110',
          isOpen ? 'scale-110' : 'scale-100'
        ]"
      >
        <img v-if="store.userProfile.images?.[0]?.url" :src="store.userProfile.images?.[0]?.url" class="h-12 w-12 rounded-full object-cover" />
        <img v-else :src="'/default.png'" class="h-12 w-12 rounded-full object-cover" />
      </div>
    </PopoverTrigger>

    <PopoverContent class="w-auto mr-6 bg-black/70 backdrop-blur-sm border border-gray-700 rounded-xl text-white shadow-sm">
      <div class="flex-col space-y-4">
        <div class="grid gap-2">
          <div class="flex items-center gap-4">
            <Label>Username:</Label>
            <p>{{ store.userProfile.display_name }}</p>
          </div>
          <div class="flex items-center gap-4">
            <Label>Email:</Label>
            <p>{{ store.userProfile.email }}</p>
          </div>
          <div class="flex items-center gap-4">
            <Label>Country:</Label>
            <p>{{ store.userProfile.country }}</p>
          </div>
          <div v-if="store.userProfile.product == 'premium'" class="flex items-center gap-4">
            <Label>Type count:</Label>
            <SparklesText
              :text="store.userProfile.product"
              :colors="{ first: '#1DB954', second: '#9B4DE0' }"
              :sparkles-count="4"
            />
          </div>
          <div v-else>
            <Label>Type count:</Label>
            <span class="ml-4">{{ store.userProfile.product }}</span>
          </div>
          <div class="flex items-center gap-4">
            <InteractiveHoverButton :text="'Logout'" class="w-full" @click="LogOutComponent()"/>
          </div>
        </div>
      </div>
    </PopoverContent>
  </Popover>
</template>

<script setup>
import { ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';
import { SparklesText } from '@/components/ui/sparkles-text';
import { useRouter } from 'vue-router';
import { spotyStore } from '../../SpotifyStore/spotyStore';

const store = spotyStore();
const router = useRouter();

// Controla si el popover está abierto
const isOpen = ref(false);

function LogOutComponent() {
  store.LogOut();
  router.push('/');
}
</script>
