<script setup lang="ts">
import type { WithClassAsProps } from './interface'
import { ArrowLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useCarousel } from './useCarousel'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    variant="outline"
    :class="cn(
      'touch-manipulation absolute h-8 w-8 rounded-full p-0',
      'bg-black text-white border border-white',
      'hover:bg-neutral-800 hover:text-white',
      'disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
      orientation === 'horizontal'
        ? '-left-8 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft class="h-4 w-4 text-white" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>

