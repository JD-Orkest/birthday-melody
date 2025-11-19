<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import { useProgressStore } from '@/store/useProgress'
import InputCode from '@/components/atoms/InputCode.vue'
import { STEPS_INFO } from '@/data/content'
import { enterPage } from '@/composables/useMotion'
import gsap from 'gsap'

const progressStore = useProgressStore()
const pageRef = ref<HTMLElement | null>(null)
const codeInput = ref('')
const error = ref('')
const success = ref('')
const confettiContainer = ref<HTMLElement | null>(null)

const stepInfo = STEPS_INFO[4]
const isUnlocked = ref(progressStore.isStepUnlocked(5))

const launchConfetti = () => {
  if (!confettiContainer.value) return

  const colors = ['#E7B980', '#E9C7C2', '#F2EFEA', '#DDE7F3', '#FFD700']
  const count = 100

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement('div')
    confetti.classList.add('confetti')
    
    // Random properties
    const bg = colors[Math.floor(Math.random() * colors.length)]
    const left = Math.random() * 100 + '%'
    const animDuration = Math.random() * 3 + 2
    const animDelay = Math.random() * 2
    
    confetti.style.backgroundColor = bg
    confetti.style.left = left
    confetti.style.top = '-20px'
    confetti.style.width = Math.random() * 10 + 5 + 'px'
    confetti.style.height = Math.random() * 5 + 5 + 'px'
    confetti.style.position = 'absolute'
    confetti.style.borderRadius = '2px'
    
    confettiContainer.value.appendChild(confetti)

    gsap.to(confetti, {
      y: '100vh',
      rotationX: Math.random() * 360 * 4,
      rotationY: Math.random() * 360 * 4,
      duration: animDuration,
      delay: animDelay,
      ease: 'power1.out',
      repeat: -1,
      onRepeat: () => {
        gsap.set(confetti, { y: -20, rotationX: 0, rotationY: 0 })
      }
    })
  }
}

const handleSubmit = (code: string) => {
  error.value = ''
  success.value = ''
  
  const isValid = progressStore.validate(5, code)
  
  if (isValid) {
    success.value = 'Bravo ! Tu as trouvé !'
    error.value = ''
    codeInput.value = ''
    isUnlocked.value = true
    nextTick(() => {
      launchConfetti()
    })
  } else {
    error.value = 'Code incorrect. Réessaie.'
    success.value = ''
  }
}

onMounted(() => {
  if (pageRef.value) {
    enterPage(pageRef.value, { delay: 0.1 })
  }
  
  if (isUnlocked.value) {
    nextTick(() => {
      launchConfetti()
    })
  }
})
</script>

<template>
  <div ref="pageRef" class="step-page">
    <div v-if="isUnlocked" ref="confettiContainer" class="confetti-container"></div>
    
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
        
        <div v-else class="step-page__unlocked victory-view">
          <div class="victory-card">
            <div class="victory-card__icon">🏆</div>
            <h2 class="victory-card__title">FÉLICITATIONS !</h2>
            <p class="victory-card__text">
              Tu as brillamment résolu toutes les énigmes.
            </p>
            
            <div class="victory-card__gift">
              <h3 class="victory-card__gift-title">Ton Cadeau</h3>
              <p class="victory-card__gift-desc">
                Prépare ton maillot (ou pas...) !<br>
                Une <strong>journée de détente en amoureux à Elaisa Wellness</strong> à Maasmechelen.<br>
                <span class="victory-card__small">À la date de ton choix.</span>
              </p>
            </div>

            <div class="victory-card__bonus">
              <p>
                🎁 Pssst... Un autre cadeau t'attend sagement dans ta <strong>garde-robe</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-page {
  padding: var(--spacing-xl) 0 var(--spacing-2xl);
  min-height: calc(100vh - 200px);
  position: relative;
  overflow-x: hidden;
  
  &__header {
    text-align: center;
    margin-bottom: var(--spacing-2xl);
    position: relative;
    z-index: 2;
  }
  
  &__breadcrumb {
    margin-bottom: var(--spacing-lg);
  }
  
  &__back {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    color: var(--muted-ink);
    font-size: 0.875rem;
    transition: color var(--transition-fast);
    
    &:hover {
      color: var(--accent-amber);
    }
  }
  
  &__icon {
    font-size: 3rem;
    color: var(--accent-amber);
    margin-bottom: var(--spacing-md);
    filter: drop-shadow(0 0 15px rgba(231, 185, 128, 0.3));
  }
  
  &__title {
    font-size: 2rem;
    margin: 0 0 var(--spacing-xs);
    background: var(--gradient-primary);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  &__subtitle {
    color: var(--muted-ink);
    font-size: 1.125rem;
  }
  
  &__content {
    max-width: 600px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  &__hint {
    background: rgba(231, 185, 128, 0.1);
    border: 1px solid rgba(231, 185, 128, 0.2);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    text-align: center;
    font-style: italic;
    color: var(--ink);
  }
}

.confetti-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.victory-view {
  animation: popIn 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.victory-card {
  background: rgba(20, 24, 38, 0.8);
  backdrop-filter: blur(20px);
  border-radius: var(--radius-xl);
  padding: var(--spacing-2xl);
  text-align: center;
  border: 1px solid rgba(231, 185, 128, 0.3);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 640px) {
    padding: var(--spacing-lg);
  }

  &__icon {
    font-size: 4rem;
    margin-bottom: var(--spacing-md);
    animation: bounce 2s infinite;
    
    @media (max-width: 640px) {
      font-size: 3rem;
    }
  }

  &__title {
    font-size: 2.5rem;
    color: var(--accent-amber);
    margin-bottom: var(--spacing-md);
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
    width: 100%;
    
    @media (max-width: 640px) {
      font-size: 1.75rem;
      letter-spacing: 1px;
    }
  }

  &__text {
    font-size: 1.1rem;
    color: var(--muted-ink);
    margin-bottom: var(--spacing-xl);
  }

  &__gift {
    background: linear-gradient(135deg, rgba(231, 185, 128, 0.1), rgba(233, 199, 194, 0.1));
    border-radius: var(--radius-lg);
    padding: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
    border: 1px solid rgba(231, 185, 128, 0.2);
    
    &-title {
      font-size: 1.5rem;
      color: var(--ink);
      margin-bottom: var(--spacing-sm);
      font-family: var(--font-heading);
    }

    &-desc {
      font-size: 1.1rem;
      line-height: 1.6;
      color: var(--ink);
      
      strong {
        color: var(--accent-amber);
      }
    }
  }

  &__small {
    display: block;
    font-size: 0.9rem;
    color: var(--muted-ink);
    margin-top: var(--spacing-xs);
    font-style: italic;
  }

  &__bonus {
    font-size: 1.1rem;
    color: var(--accent-rose);
    font-weight: 500;
    padding: var(--spacing-md);
    background: rgba(233, 199, 194, 0.05);
    border-radius: var(--radius-md);
    
    strong {
      color: var(--ink);
      text-decoration: underline;
      text-decoration-color: var(--accent-amber);
    }
  }
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>


