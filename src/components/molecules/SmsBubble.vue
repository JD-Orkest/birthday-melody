<script setup lang="ts">
interface SmsBubbleProps {
  from: 'me' | 'her'
  text: string
  time?: string
}

defineProps<SmsBubbleProps>()
</script>

<template>
  <div class="sms-bubble" :class="`sms-bubble--${from}`">
    <div class="sms-bubble__content">
      <p class="sms-bubble__text">{{ text }}</p>
      <time v-if="time" class="sms-bubble__time" :datetime="time">
        {{ time }}
      </time>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sms-bubble {
  display: flex;
  margin-bottom: var(--spacing-md);
  animation: bubble-in 0.25s ease-out;
  
  @keyframes bubble-in {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  &--me {
    justify-content: flex-end;
    
    .sms-bubble__content {
      background: var(--accent-amber);
      color: var(--bg);
      border-bottom-right-radius: 4px;
    }
  }
  
  &--her {
    justify-content: flex-start;
    
    .sms-bubble__content {
      background: var(--surface);
      color: var(--ink);
      border-bottom-left-radius: 4px;
    }
  }
  
  &__content {
    max-width: 75%;
    padding: var(--spacing-md);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    
    @media (max-width: 640px) {
      max-width: 85%;
    }
  }
  
  &__text {
    margin: 0;
    font-size: 0.9375rem;
    line-height: 1.5;
    word-wrap: break-word;
    white-space: pre-line;
  }
  
  &__time {
    display: block;
    font-size: 0.75rem;
    opacity: 0.7;
    text-align: right;
  }
}
</style>
