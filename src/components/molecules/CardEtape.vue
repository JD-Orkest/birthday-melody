<script setup lang="ts">
import { onMounted, ref } from 'vue'
import InputCode from '@/components/atoms/InputCode.vue'
import Button from '@/components/atoms/Button.vue'
import { hoverScale } from '@/composables/useMotion'

interface CardEtapeProps {
  stepNumber: number
  title: string
  subtitle: string
  icon: string
  locked?: boolean
  alreadyUnlocked?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<CardEtapeProps>(), {
  locked: true,
  alreadyUnlocked: false,
  disabled: false
})

const emit = defineEmits<{
  submit: [code: string]
  enter: []
}>()

const cardRef = ref<HTMLElement | null>(null)
const codeInput = ref('')
const error = ref('')
const success = ref('')

const handleSubmit = (code: string) => {
  error.value = ''
  success.value = ''
  emit('submit', code)
}

const handleValidationResult = (isValid: boolean) => {
  if (isValid) {
    success.value = 'Déverrouillé !'
    error.value = ''
    codeInput.value = ''
  } else {
    error.value = 'Code incorrect. Réessaie.'
    success.value = ''
  }
}

const handleEnter = () => {
  emit('enter')
}

onMounted(() => {
  if (cardRef.value && !props.locked) {
    const hover = hoverScale(cardRef.value, 1.01)
    if (hover) {
      cardRef.value.addEventListener('mouseenter', hover.enter)
      cardRef.value.addEventListener('mouseleave', hover.leave)
    }
  }
})

defineExpose({ handleValidationResult })
</script>

<template>
  <article
    ref="cardRef"
    class="card-etape"
    :class="{
      'card-etape--locked': locked && !alreadyUnlocked && !disabled,
      'card-etape--unlocked': (!locked || alreadyUnlocked) && !disabled,
      'card-etape--disabled': disabled
    }"
  >
    <div class="card-etape__header">
      <div class="card-etape__icon" :aria-hidden="true">
        <font-awesome-icon :icon="icon" />
      </div>
      
      <div class="card-etape__info">
        <h3 class="card-etape__title">
          {{ title }}
        </h3>
        <p class="card-etape__subtitle">
          {{ subtitle }}
        </p>
      </div>
    </div>
    
    <div class="card-etape__body">
      <div v-if="disabled" class="card-etape__disabled-content">
        <p class="card-etape__hint card-etape__hint--disabled">
          <font-awesome-icon icon="lock" class="card-etape__lock-icon" />
          Termine l'étape précédente pour accéder à celle-ci.
        </p>
      </div>

      <div v-else-if="locked && !alreadyUnlocked" class="card-etape__locked">
        <slot name="hint">
          <p class="card-etape__hint">
            Entre le code pour déverrouiller cette étape.
          </p>
        </slot>
        
        <InputCode
          v-model="codeInput"
          :error="error"
          :success="success"
          @submit="handleSubmit"
        />
      </div>
      
      <div v-else class="card-etape__unlocked">
        <div v-if="alreadyUnlocked" class="card-etape__status">
          <span class="card-etape__badge card-etape__badge--success">
            ✓ Déverrouillé
          </span>
        </div>
        <Button variant="primary" size="md" @click="handleEnter">
          Entrer →
        </Button>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card-etape {
  background: var(--surface);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
  border: var(--border-subtle);
  position: relative;
  overflow: hidden;
  
  // Gradient overlay subtil
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--gradient-primary);
    opacity: 0;
    transition: opacity var(--transition-normal);
  }
  
  &--unlocked {
    cursor: pointer;
    
    &:hover {
      box-shadow: var(--shadow-lg);
      border-color: var(--accent-amber);
      transform: translateY(-4px);
      
      &::before {
        opacity: 1;
      }
      
      .card-etape__icon {
        transform: scale(1.1) rotate(5deg);
        box-shadow: var(--shadow-glow);
      }
    }
    
    &:active {
      transform: translateY(-2px);
    }
  }
  
  &--locked {
    opacity: 0.85;
  }

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
    filter: grayscale(0.8);
  }
  
  &__header {
    display: flex;
    align-items: flex-start;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }
  
  &__icon {
    font-size: 1.5rem;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(231, 185, 128, 0.15), rgba(231, 185, 128, 0.05));
    border-radius: var(--radius-md);
    color: var(--accent-amber);
    border: var(--border-default);
    transition: all var(--transition-bounce);
    backdrop-filter: blur(10px);
  }
  
  &__info {
    flex: 1;
  }
  
  &__title {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: 1.125rem;
    color: var(--ink);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }
  
  &__subtitle {
    margin: 0;
    font-size: 0.875rem;
    color: var(--muted-ink);
    font-weight: 400;
    line-height: 1.5;
  }
  
  &__body {
    margin-top: var(--spacing-lg);
  }
  
  &__hint {
    margin-bottom: var(--spacing-lg);
    font-size: 0.9375rem;
    color: var(--accent-ice);
    font-style: italic;
    line-height: 1.6;
    padding: var(--spacing-md);
    background: rgba(221, 231, 243, 0.05);
    border-left: 3px solid var(--accent-ice);
    border-radius: var(--radius-sm);

    &--disabled {
      display: flex;
      align-items: center;
      gap: var(--spacing-sm);
      opacity: 0.8;
      border-left-color: var(--muted-ink);
      color: var(--muted-ink);
      background: rgba(0, 0, 0, 0.2);
    }
  }

  &__lock-icon {
    font-size: 1rem;
    color: var(--muted-ink);
  }
  
  &__status {
    display: flex;
    justify-content: center;
    margin-bottom: var(--spacing-md);
  }
  
  &__badge {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-xs);
    padding: var(--spacing-xs) var(--spacing-md);
    border-radius: var(--radius-full);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    
    &--success {
      background: linear-gradient(135deg, rgba(138, 209, 161, 0.2), rgba(138, 209, 161, 0.1));
      color: var(--success);
      border: 1px solid rgba(138, 209, 161, 0.3);
      box-shadow: 0 2px 8px rgba(138, 209, 161, 0.15);
    }
  }
  
  &__unlocked {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
    width: 100%;
    
    .btn {
      max-width: 200px;
      width: 100%;
      box-shadow: var(--shadow-md);
      
      &:hover {
        box-shadow: var(--shadow-lg);
      }
    }
  }
}

@media (max-width: 640px) {
  .card-etape {
    padding: var(--spacing-lg);
    
    &__icon {
      font-size: 1.25rem;
      width: 48px;
      height: 48px;
    }
    
    &__title {
      font-size: 1rem;
    }
  }
}
</style>
