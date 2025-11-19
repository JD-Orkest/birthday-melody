<script setup lang="ts">
interface TagProps {
  variant?: 'default' | 'amber' | 'rose' | 'ice'
  size?: 'sm' | 'md'
}

withDefaults(defineProps<TagProps>(), {
  variant: 'default',
  size: 'md'
})
</script>

<template>
  <span :class="['tag', `tag--${variant}`, `tag--${size}`]">
    <slot />
  </span>
</template>

<style scoped lang="scss">
.tag {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  border-radius: var(--radius-lg);
  font-weight: 500;
  white-space: nowrap;
  
  &--sm {
    padding: 4px 12px;
    font-size: 0.75rem;
  }
  
  &--md {
    padding: 6px 16px;
    font-size: 0.875rem;
  }
  
  &--default {
    background: var(--surface);
    color: var(--muted-ink);
  }
  
  &--amber {
    background: rgba(231, 185, 128, 0.15);
    color: var(--accent-amber);
  }
  
  &--rose {
    background: rgba(233, 199, 194, 0.15);
    color: var(--accent-rose);
  }
  
  &--ice {
    background: rgba(221, 231, 243, 0.15);
    color: var(--accent-ice);
  }
}
</style>
