<script setup lang="ts">
import { useProgressStore } from '@/store/useProgress'
import { computed } from 'vue'

const progressStore = useProgressStore()

const progressPercentage = computed(() => progressStore.progress)
</script>

<template>
  <header class="app-header">
    <div class="container">
      <div class="app-header__content">
        <div class="app-header__branding">
          <h1 class="app-header__title">
            <router-link to="/" class="app-header__link">
              Melody
            </router-link>
          </h1>
          <div class="app-header__subtitle">
            Un voyage en 5 étapes
          </div>
        </div>
        
        <div class="app-header__progress">
          <div class="app-header__progress-bar">
            <div
              class="app-header__progress-fill"
              :style="{ width: `${progressPercentage}%` }"
              role="progressbar"
              :aria-valuenow="progressPercentage"
              aria-valuemin="0"
              aria-valuemax="100"
            />
          </div>
          <span class="app-header__progress-text" aria-live="polite">
            {{ progressStore.unlockedCount }} / {{ progressStore.totalSteps }}
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  background: rgba(20, 24, 38, 0.85);
  border-bottom: var(--border-subtle);
  padding: var(--spacing-lg) 0;
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  backdrop-filter: blur(20px) saturate(180%);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-xl);
    
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: var(--spacing-md);
    }
  }
  
  &__branding {
    flex: 1;
  }
  
  &__title {
    margin: 0;
    font-size: clamp(1.25rem, 3vw, 1.75rem);
    font-weight: 700;
    letter-spacing: -0.02em;
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &__link {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-decoration: none;
    transition: all var(--transition-fast);
    display: inline-block;
    
    &:hover {
      transform: translateY(-1px);
    }
  }
  
  &__subtitle {
    font-size: 0.875rem;
    color: var(--subtle-ink);
    margin-top: var(--spacing-xs);
    font-weight: 400;
  }
  
  &__progress {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    min-width: 220px;
    
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  
  &__progress-bar {
    flex: 1;
    height: 10px;
    background: var(--surface-elevated);
    border-radius: var(--radius-full);
    overflow: hidden;
    border: var(--border-subtle);
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, 
        transparent, 
        rgba(255, 255, 255, 0.1), 
        transparent
      );
      animation: shimmer 2s infinite;
    }
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
  
  &__progress-fill {
    height: 100%;
    background: var(--gradient-primary);
    transition: width 0.6s cubic-bezier(0.65, 0, 0.35, 1);
    border-radius: var(--radius-full);
    box-shadow: 0 0 10px rgba(231, 185, 128, 0.4);
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3));
      border-radius: var(--radius-full);
    }
  }
  
  &__progress-text {
    font-size: 0.875rem;
    color: var(--accent-amber);
    font-weight: 600;
    min-width: 40px;
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
}
</style>
