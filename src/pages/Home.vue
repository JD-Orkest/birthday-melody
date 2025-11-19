<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '@/store/useProgress'
import CardEtape from '@/components/molecules/CardEtape.vue'
import Tag from '@/components/atoms/Tag.vue'
import Button from '@/components/atoms/Button.vue'
import { STEPS_INFO } from '@/data/content'
import { enterPage, staggerReveal } from '@/composables/useMotion'

const router = useRouter()
const progressStore = useProgressStore()

const pageRef = ref<HTMLElement | null>(null)
const cardsRef = ref<HTMLElement | null>(null)

const handleCodeSubmit = (step: number, code: string) => {
  const card = document.querySelector(`[data-step="${step}"]`) as any
  const isValid = progressStore.validate(step, code)
  
  if (card && card.handleValidationResult) {
    card.handleValidationResult(isValid)
  }
  
  if (isValid) {
    setTimeout(() => {
      router.push(`/etape/${step}`)
    }, 1000)
  }
}

const handleEnterStep = (step: number) => {
  router.push(`/etape/${step}`)
}

onMounted(() => {
  if (pageRef.value) {
    enterPage(pageRef.value, { delay: 0.1 })
  }
  
  if (cardsRef.value) {
    const cards = cardsRef.value.querySelectorAll('.card-etape')
    staggerReveal(cards, { delay: 0.2, stagger: 0.1 })
  }
})
</script>

<template>
  <div ref="pageRef" class="home-page">
    <div class="container">
      <header class="home-page__header">
        <h1 class="home-page__title">
          Bon anniversaire Melo ✨
        </h1>
        
        <div class="home-page__tags">
          
          <Tag variant="rose" size="sm">Blondy</Tag>
          <Tag variant="ice" size="sm">Mandoline</Tag>
          <Tag variant="amber" size="sm">Symfony</Tag>
        </div>
        
        <p class="home-page__intro">
          Trouve les codes, et tu trouveras ton cadeau.
Simple, non ? Enfin… simple, sauf si t’as toujours la même logique que celle qui t’a fait décapiter un nain de jardin.
        </p>
      </header>
      
      <div ref="cardsRef" class="home-page__steps">
        <CardEtape
          v-for="step in STEPS_INFO"
          :key="step.id"
          :ref="`step-${step.id}`"
          :data-step="step.id"
          :step-number="step.id"
          :title="step.title"
          :subtitle="step.subtitle"
          :icon="step.icon"
          :locked="!progressStore.isStepUnlocked(step.id)"
          :already-unlocked="progressStore.isStepUnlocked(step.id)"
          :disabled="!progressStore.canAccessStep(step.id)"
          @submit="(code) => handleCodeSubmit(step.id, code)"
          @enter="handleEnterStep(step.id)"
        >
          <template #hint>
            <p class="home-page__hint">
              {{ step.hint }}
            </p>
          </template>
        </CardEtape>
      </div>
      
      <div v-if="progressStore.unlockedCount > 0" class="home-page__cta">
        <p class="home-page__encouragement">
          {{ 
            progressStore.progress === 100 
              ? 'Bravo ! Tu as tout déverrouillé. Le voyage est complet.' 
              : `Continues, tu es à ${progressStore.progress}% !` 
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-page {
  padding: var(--spacing-2xl) 0;
  min-height: calc(100vh - 200px);
  
  &__header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
  }
  
  &__title {
    font-size: clamp(2rem, 5vw, 3.5rem);
    margin-bottom: var(--spacing-lg);
    background: linear-gradient(135deg, var(--accent-amber), var(--accent-rose));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  &__tags {
    display: flex;
    gap: var(--spacing-sm);
    justify-content: center;
    margin-bottom: var(--spacing-lg);
    flex-wrap: wrap;
  }
  
  &__intro {
    max-width: 600px;
    margin: 0 auto;
    color: var(--muted-ink);
    font-size: 1.125rem;
    line-height: 1.7;
  }
  
  &__steps {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  &__hint {
    margin-bottom: var(--spacing-md);
    font-size: 0.9375rem;
    color: var(--accent-ice);
    font-style: italic;
    padding: var(--spacing-md);
    background: rgba(221, 231, 243, 0.05);
    border-left: 3px solid var(--accent-ice);
    border-radius: var(--radius-sm);
  }
  
  &__cta {
    text-align: center;
    margin-top: var(--spacing-2xl);
  }
  
  &__encouragement {
    font-size: 1.125rem;
    color: var(--accent-amber);
    font-weight: 500;
  }
}

@media (max-width: 768px) {
  .home-page {
    padding: var(--spacing-xl) 0;
    
    &__intro {
      font-size: 1rem;
    }
    
    &__steps {
      gap: var(--spacing-md);
    }
  }
}
</style>
