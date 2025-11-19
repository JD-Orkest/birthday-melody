<script setup lang="ts">
import { useProgressStore } from '@/store/useProgress'
import { ref } from 'vue'

const progressStore = useProgressStore()
const showResetConfirm = ref(false)

const handleResetClick = () => {
  showResetConfirm.value = true
}

const handleResetConfirm = () => {
  progressStore.reset()
  showResetConfirm.value = false
}

const handleResetCancel = () => {
  showResetConfirm.value = false
}
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__content">
        <p class="app-footer__text">
          Fait avec ❤️ pour Melo
        </p>
        
        <div class="app-footer__actions">
          <button
            v-if="!showResetConfirm"
            type="button"
            class="app-footer__reset"
            @click="handleResetClick"
          >
            Réinitialiser le voyage
          </button>
          
          <div v-else class="app-footer__confirm">
            <span class="app-footer__confirm-text">Êtes-vous sûr(e) ?</span>
            <button
              type="button"
              class="app-footer__confirm-btn app-footer__confirm-btn--yes"
              @click="handleResetConfirm"
            >
              Oui
            </button>
            <button
              type="button"
              class="app-footer__confirm-btn app-footer__confirm-btn--no"
              @click="handleResetCancel"
            >
              Non
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.app-footer {
  background: var(--surface);
  border-top: 1px solid rgba(231, 185, 128, 0.1);
  padding: var(--spacing-xl) 0;
  margin-top: auto;
  position: relative;
  z-index: 10;
  background: rgba(21, 26, 44, 0.9);
  backdrop-filter: blur(10px);
  
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--spacing-lg);
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  &__text {
    margin: 0;
    color: var(--muted-ink);
    font-size: 0.875rem;
  }
  
  &__actions {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
  }
  
  &__reset {
    padding: var(--spacing-sm) var(--spacing-md);
    background: transparent;
    color: var(--muted-ink);
    border: 1px solid var(--muted-ink);
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 500;
    
    &:hover {
      color: var(--danger);
      border-color: var(--danger);
    }
  }
  
  &__confirm {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  
  &__confirm-text {
    font-size: 0.875rem;
    color: var(--muted-ink);
  }
  
  &__confirm-btn {
    padding: var(--spacing-xs) var(--spacing-md);
    border: 1px solid;
    border-radius: var(--radius-sm);
    font-size: 0.75rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    font-weight: 500;
    text-transform: uppercase;
    min-width: 50px;
    
    &--yes {
      background: transparent;
      color: var(--danger);
      border-color: var(--danger);
      
      &:hover {
        background: var(--danger);
        color: var(--ink);
      }
    }
    
    &--no {
      background: transparent;
      color: var(--muted-ink);
      border-color: var(--muted-ink);
      
      &:hover {
        background: var(--muted-ink);
        color: var(--bg);
      }
    }
  }
}
</style>
