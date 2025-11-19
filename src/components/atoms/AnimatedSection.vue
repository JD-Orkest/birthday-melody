<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { scrollFadeIn } from '@/composables/useMotion'

const sectionRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (sectionRef.value) {
    scrollFadeIn(sectionRef.value, { duration: 0.8 })
  }
})
</script>

<template>
  <section ref="sectionRef" class="animated-section">
    <slot />
  </section>
</template>

<style scoped lang="scss">
.animated-section {
  opacity: 0;
  will-change: transform, opacity;
}
</style>
