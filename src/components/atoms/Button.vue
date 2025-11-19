<script setup lang="ts">
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  type: 'button'
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :class="['btn', `btn--${variant}`, `btn--${size}`]"
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: 0.625rem 1.25rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 0.9375rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
  line-height: 1.4;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &--primary {
    background: var(--accent-amber);
    color: var(--background);
    box-shadow: 0 1px 3px rgba(231, 185, 128, 0.3);
    
    &:hover:not(:disabled) {
      background: #d9a86d;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(231, 185, 128, 0.4);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(231, 185, 128, 0.2);
    }
  }
  
  &--secondary {
    background: transparent;
    color: var(--ink);
    border: 1px solid rgba(231, 185, 128, 0.3);
    
    &:hover:not(:disabled) {
      background: rgba(231, 185, 128, 0.08);
      border-color: var(--accent-amber);
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  }
  
  &--small {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
  
  &--large {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
</style>
