<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProgressStore } from '@/store/useProgress'
import Timeline from '@/components/organisms/Timeline.vue'
import InputCode from '@/components/atoms/InputCode.vue'
import { TIMELINE, STEPS_INFO } from '@/data/content'
import { enterPage } from '@/composables/useMotion'

const progressStore = useProgressStore()
const pageRef = ref<HTMLElement | null>(null)
const codeInput = ref('')
const error = ref('')
const success = ref('')

const stepInfo = STEPS_INFO[0]
const isUnlocked = progressStore.isStepUnlocked(1)

const handleSubmit = (code: string) => {
  error.value = ''
  success.value = ''
  
  const isValid = progressStore.validate(1, code)
  
  if (isValid) {
    success.value = 'Déverrouillé ! Découvre les souvenirs...'
    error.value = ''
    codeInput.value = ''
  } else {
    error.value = 'Code incorrect. Réessaie.'
    success.value = ''
  }
}

onMounted(() => {
  if (pageRef.value) {
    enterPage(pageRef.value, { delay: 0.1 })
  }
})
</script>

<template>
  <div ref="pageRef" class="step-page">
    <div class="container">
      <header class="step-page__header">
        <div class="step-page__breadcrumb">
          <router-link to="/" class="step-page__back">
            <font-awesome-icon icon="arrow-left" />
            Retour
          </router-link>
        </div>
        
        <div class="step-page__icon" aria-hidden="true">
          <font-awesome-icon :icon="stepInfo.icon" />
        </div>
        
        <h1 class="step-page__title">
          {{ stepInfo.title }}
        </h1>
        
        <p class="step-page__subtitle">
          {{ stepInfo.subtitle }}
        </p>
      </header>
      
      <div class="step-page__content">
        <div v-if="!isUnlocked" class="step-page__locked">
          <div class="step-page__hint">
            <p>{{ stepInfo.hint }}</p>
          </div>
          
          <InputCode
            v-model="codeInput"
            :error="error"
            :success="success"
            @submit="handleSubmit"
          />
        </div>
        
        <div v-else class="step-page__unlocked">
          <div class="step-page__intro">
            <p>
              Voici nos moments préférés, ceux qui racontent notre histoire...
            </p>
          </div>
          
          <Timeline :items="TIMELINE" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-page {
  padding: var(--spacing-xl) 0 var(--spacing-2xl);
  min-height: calc(100vh - 200px);
  
  &__header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
  }
  
  &__breadcrumb {
    margin-bottom: var(--spacing-lg);
  }
  
  &__back {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: 0.5rem 0.75rem;
    background: rgba(221, 231, 243, 0.08);
    border: 1px solid rgba(221, 231, 243, 0.2);
    border-radius: var(--radius-md);
    color: var(--accent-ice);
    font-size: 0.875rem;
    font-weight: 500;
    text-decoration: none;
    transition: all var(--transition-fast);
    
    &:hover {
      background: rgba(231, 185, 128, 0.08);
      border-color: rgba(231, 185, 128, 0.3);
      color: var(--accent-amber);
      transform: translateY(-1px);
    }
  }
  
  &__icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-md);
    color: var(--accent-amber);
  }
  
  &__title {
    font-size: clamp(1.75rem, 4vw, 2.5rem);
    margin-bottom: var(--spacing-sm);
    color: var(--accent-amber);
  }
  
  &__subtitle {
    color: var(--muted-ink);
    font-size: 1.125rem;
  }
  
  &__content {
    max-width: 1000px;
    margin: 0 auto;
  }
  
  &__locked {
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
  }
  
  &__hint {
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-lg);
    background: rgba(221, 231, 243, 0.05);
    border-left: 4px solid var(--accent-ice);
    border-radius: var(--radius-md);
    
    p {
      margin: 0;
      color: var(--accent-ice);
      font-style: italic;
      font-size: 1.0625rem;
    }
  }
  
  &__intro {
    text-align: center;
    margin-bottom: var(--spacing-xl);
    
    p {
      font-size: 1.125rem;
      color: var(--muted-ink);
      max-width: 600px;
      margin: 0 auto;
    }
  }
}
</style>
