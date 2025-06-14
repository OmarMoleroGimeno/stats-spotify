<template>
    <div class="flex flex-row items-center bg-customGray px-[8px] py-[4px] rounded-full border-b-[2px] border-customGreen">
        <Select v-model="store.term">
            <SelectTrigger class="w-[150px] border-none focus:ring-0 focus:outline-none">
                <SelectValue placeholder="Select the time" class="text-white"/>
            </SelectTrigger>
            <SelectContent class="bg-gray/30 backdrop-blur-sm text-white border-gray-500 ">
                <SelectGroup>
                <SelectLabel>Times</SelectLabel>
                <SelectItem value="short_term" class="cursor-pointer">
                    4 weeks ago
                </SelectItem>
                <SelectItem value="medium_term" class="cursor-pointer">
                    6 months ago
                </SelectItem>
                <SelectItem value="long_term" class="cursor-pointer">
                    Last year
                </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { spotyStore } from '@/SpotifyStore/spotyStore';import { watch } from 'vue';

const store = spotyStore();
watch(() => store.term, () => {
  store.onInit();
});
</script>