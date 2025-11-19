<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { TimelineItem } from '@/data/content'
import { staggerReveal } from '@/composables/useMotion'

interface TimelineProps {
  items: TimelineItem[]
}

defineProps<TimelineProps>()

const timelineRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (timelineRef.value) {
    const items = timelineRef.value.querySelectorAll('.timeline__item')
    staggerReveal(items, { delay: 0.1, stagger: 0.1 })
  }
})
</script>

<template>
  <div ref="timelineRef" class="timeline">
    <div
      v-for="item in items"
      :key="item.id"
      class="timeline__item"
    >
     
      
      <div class="timeline__content">
        <div class="timeline__meta">{{ item.meta }}</div>
        <h3 class="timeline__title">{{ item.title }}</h3>
        <p class="timeline__text">{{ item.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  padding: var(--spacing-lg) 0;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-xl);
  }
  
  &__item {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
    background: var(--surface);
    border-radius: var(--radius-lg);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-normal);
    
    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
  }
  
  &__image {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: var(--bg);
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-slow);
    }
    
    &:hover img {
      transform: scale(1.05);
    }
  }
  
  &__content {
    padding: var(--spacing-lg);
    padding-top: 10;
  }
  
  &__meta {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--accent-amber);
    margin-bottom: var(--spacing-xs);
    font-weight: 600;
  }
  
  &__title {
    margin: 0 0 var(--spacing-sm) 0;
    font-size: 1.25rem;
    color: var(--ink);
  }
  
  &__text {
    margin: 0;
    color: var(--muted-ink);
    line-height: 1.6;
    font-size: 0.9375rem;
  }
}

@media (max-width: 640px) {
  .timeline {
    gap: var(--spacing-lg);
    
    &__image {
      height: 180px;
    }
    
    &__content {
      padding: var(--spacing-md);
    }
  }
}
</style>
