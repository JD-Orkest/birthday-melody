<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import gsap from 'gsap'

interface InputCodeProps {
  modelValue?: string
  label?: string
  placeholder?: string
  error?: string
  success?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<InputCodeProps>(), {
  modelValue: '',
  label: 'Entrer le code',
  placeholder: 'Code secret...',
  error: '',
  success: '',
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const wrapperRef = ref<HTMLDivElement | null>(null)
const confettiContainer = ref<HTMLDivElement | null>(null)

const localValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value)
})

const createConfetti = () => {
  if (!confettiContainer.value) return
  
  const colors = ['#E7B980', '#DDE7F3', '#E9C7C2', '#F2EFEA']
  const confettiCount = 50
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    confetti.style.left = '50%'
    confetti.style.top = '50%'
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
    confetti.style.width = `${Math.random() * 8 + 4}px`
    confetti.style.height = `${Math.random() * 8 + 4}px`
    
    confettiContainer.value.appendChild(confetti)
    
    const angle = (Math.random() * 360) * (Math.PI / 180)
    const velocity = Math.random() * 200 + 100
    const x = Math.cos(angle) * velocity
    const y = Math.sin(angle) * velocity
    
    gsap.to(confetti, {
      x: x,
      y: y,
      rotation: Math.random() * 720 - 360,
      opacity: 0,
      duration: 1.5 + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => confetti.remove()
    })
  }
}

const playSuccessAnimation = () => {
  if (!wrapperRef.value) return
  
  // Animation de "pulse" du wrapper
  gsap.to(wrapperRef.value, {
    scale: 1.05,
    duration: 0.2,
    ease: 'back.out(2)',
    yoyo: true,
    repeat: 1
  })
  
  // Créer les confettis
  createConfetti()
}

// Watcher pour détecter le succès
watch(() => props.success, (newSuccess, oldSuccess) => {
  if (newSuccess && !oldSuccess) {
    playSuccessAnimation()
  }
})

const handleSubmit = () => {
  if (!props.disabled && localValue.value.trim()) {
    emit('submit', localValue.value)
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    handleSubmit()
  }
}

const inputId = `input-code-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="input-code">
    <label :for="inputId" class="input-code__label">
      {{ label }}
    </label>
    
    <div ref="wrapperRef" class="input-code__wrapper">
      <div ref="confettiContainer" class="input-code__confetti-container"></div>
      
      <input
        :id="inputId"
        ref="inputRef"
        v-model="localValue"
        type="text"
        class="input-code__input"
        :class="{
          'input-code__input--error': error,
          'input-code__input--success': success
        }"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? `${inputId}-error` : success ? `${inputId}-success` : undefined"
        @keydown="handleKeydown"
      />
      
      <button
        type="button"
        class="input-code__button"
        :disabled="disabled || !localValue.trim()"
        @click="handleSubmit"
      >
        Déverrouiller
      </button>
    </div>
    
    <div
      v-if="error"
      :id="`${inputId}-error`"
      class="input-code__message input-code__message--error"
      role="alert"
    >
      {{ error }}
    </div>
    
    <div
      v-if="success"
      :id="`${inputId}-success`"
      class="input-code__message input-code__message--success"
      role="status"
    >
      {{ success }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-code {
  width: 100%;
  max-width: 400px;
  
  &__label {
    display: block;
    margin-bottom: var(--spacing-sm);
    color: var(--ink);
    font-weight: 500;
    font-size: 0.875rem;
  }
  
  &__wrapper {
    display: flex;
    gap: var(--spacing-sm);
    align-items: stretch;
    position: relative;
  }
  
  &__confetti-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    overflow: visible;
    z-index: 10;
  }
  
  &__input {
    flex: 1;
    padding: 0.625rem 0.875rem;
    background: var(--surface);
    border: 2px solid transparent;
    border-radius: var(--radius-md);
    color: var(--ink);
    font-size: 0.9375rem;
    font-family: inherit;
    transition: all var(--transition-fast);
    min-height: 42px;
    max-width: 180px;
    
    &::placeholder {
      color: var(--muted-ink);
    }
    
    &:focus {
      outline: none;
      border-color: var(--accent-amber);
    }
    
    &--error {
      border-color: var(--danger);
    }
    
    &--success {
      border-color: var(--success);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__button {
    padding: 0.625rem 1rem;
    background: var(--accent-amber);
    color: var(--bg);
    border: none;
    border-radius: var(--radius-md);
    font-weight: 500;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    white-space: nowrap;
    min-height: 42px;
    flex-shrink: 0;
    
    &:hover:not(:disabled) {
      background: var(--accent-rose);
      transform: translateY(-1px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  
  &__message {
    margin-top: var(--spacing-sm);
    font-size: 0.875rem;
    
    &--error {
      color: var(--danger);
    }
    
    &--success {
      color: var(--success);
    }
  }
}

.confetti {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
</style>
