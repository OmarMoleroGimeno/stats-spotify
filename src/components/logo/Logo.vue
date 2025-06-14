<template>
    <div class="flex flex-row items-center space-x-[10px] bg-customGray px-[28px] py-[10px] rounded-full border-b-[2px] border-customGreen">  
    <img src="/src/assets/images/Full_Logo_White_RGB.svg" alt="spotify_logo" height="80px" width="80px">
  </div>
</template>
  
<script setup>
  
  const props = defineProps({
    logo: String,
  });
</script>