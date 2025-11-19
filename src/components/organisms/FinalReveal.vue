<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { FinaleInfo } from '@/data/content'
import { pulse } from '@/composables/useMotion'

interface FinalRevealProps {
  info: FinaleInfo
}

defineProps<FinalRevealProps>()

const glowRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (glowRef.value) {
    pulse(glowRef.value, { from: 0.85, to: 1, duration: 1.8 })
  }
})
</script>

<template>
  <div class="final-reveal">
    <div class="final-reveal__content">
      <div class="final-reveal__icon" aria-hidden="true">
        ✨
      </div>
      
      <h2 class="final-reveal__title">
        Le rendez-vous
      </h2>
      
      <div ref="glowRef" class="final-reveal__details">
        <div class="final-reveal__time">
          <span class="final-reveal__label">Heure</span>
          <span class="final-reveal__value">{{ info.hour }}</span>
        </div>
        
        <div class="final-reveal__address">
          <span class="final-reveal__label">Adresse</span>
          <span class="final-reveal__value">{{ info.address }}</span>
        </div>
      </div>
      
      <p class="final-reveal__message">
        À tout à l'heure... ✨
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.final-reveal {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: var(--spacing-xl) var(--spacing-lg);
  
  &__content {
    text-align: center;
    max-width: 500px;
  }
  
  &__icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-lg);
    animation: float 3s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  &__title {
    font-size: clamp(2rem, 5vw, 3rem);
    margin-bottom: var(--spacing-xl);
    color: var(--accent-amber);
  }
  
  &__details {
    background: var(--surface);
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-xl);
    border: 2px solid var(--accent-amber);
  }
  
  &__time,
  &__address {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    
    &:not(:last-child) {
      margin-bottom: var(--spacing-lg);
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid rgba(231, 185, 128, 0.2);
    }
  }
  
  &__label {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--muted-ink);
    font-weight: 600;
  }
  
  &__value {
    font-size: 1.5rem;
    color: var(--accent-amber);
    font-weight: 600;
  }
  
  &__message {
    font-size: 1.125rem;
    color: var(--muted-ink);
    font-style: italic;
    margin: 0;
  }
}

@media (max-width: 640px) {
  .final-reveal {
    min-height: 300px;
    padding: var(--spacing-lg) var(--spacing-md);
    
    &__icon {
      font-size: 3rem;
    }
    
    &__details {
      padding: var(--spacing-lg);
    }
    
    &__value {
      font-size: 1.25rem;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .final-reveal__icon {
    animation: none;
  }
}
</style>
