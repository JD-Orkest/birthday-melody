<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import SmsBubble from '@/components/molecules/SmsBubble.vue'
import type { SmsSection } from '@/data/content'
import { revealMessages, prefersReducedMotion } from '@/composables/useMotion'

interface SmsThreadProps {
  sections: SmsSection[]
}

const props = defineProps<SmsThreadProps>()

const threadRef = ref<HTMLElement | null>(null)
const displayedSections = ref<SmsSection[]>([])
const showAllButton = ref(false)

const showAllMessages = () => {
  displayedSections.value = [...props.sections]
  showAllButton.value = false
}

onMounted(async () => {
  if (prefersReducedMotion()) {
    // Show all sections at once
    displayedSections.value = [...props.sections]
    showAllButton.value = false
    return
  }
  
  // Show "see all" button
  showAllButton.value = true
  
  // Animate sections one by one
  for (const section of props.sections) {
    displayedSections.value.push(section)
    await nextTick()
    
    // Animate the section title
    const titles = threadRef.value?.querySelectorAll('.sms-thread__section-title')
    if (titles && titles.length > 0) {
      revealMessages([titles[titles.length - 1]], 0)
    }
    
    // Wait a bit before animating messages
    await new Promise(resolve => setTimeout(resolve, 150))
    
    // Animate messages in this section
    const bubbles = threadRef.value?.querySelectorAll('.sms-bubble')
    if (bubbles && bubbles.length > 0) {
      const lastBubbles = Array.from(bubbles).slice(-section.messages.length)
      for (const bubble of lastBubbles) {
        revealMessages([bubble], 0)
        await new Promise(resolve => setTimeout(resolve, 180))
      }
    }
    
    // Wait before next section
    await new Promise(resolve => setTimeout(resolve, 400))
  }
  
  showAllButton.value = false
})
</script>

<template>
  <div class="sms-thread">
    <div ref="threadRef" class="sms-thread__messages" aria-live="polite" aria-atomic="false">
      <div 
        v-for="(section, sectionIndex) in displayedSections" 
        :key="sectionIndex"
        class="sms-thread__section"
      >
        <h3 class="sms-thread__section-title">{{ section.title }}</h3>
        
        <SmsBubble
          v-for="(msg, msgIndex) in section.messages"
          :key="`${sectionIndex}-${msgIndex}`"
          :from="msg.from"
          :text="msg.text"
          :time="msg.time"
        />
      </div>
    </div>
    
    <div v-if="showAllButton" class="sms-thread__controls">
      <button
        type="button"
        class="sms-thread__show-all"
        @click="showAllMessages"
      >
        Voir tout d'un coup
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sms-thread {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  
  &__messages {
    background: var(--bg);
    border-radius: var(--radius-lg);
    padding: var(--spacing-lg);
    max-height: 600px;
    overflow-y: auto;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  
  &__section {
    margin-bottom: var(--spacing-2xl);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  &__section-title {
    color: var(--accent-amber);
    font-size: 0.9rem;
    font-weight: 600;
    text-align: center;
    margin: var(--spacing-xl) 0 var(--spacing-lg);
    padding: var(--spacing-sm) var(--spacing-md);
    background: rgba(231, 185, 128, 0.1);
    border-radius: var(--radius-md);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    
    &:first-child {
      margin-top: 0;
    }
  }
    
    scrollbar-width: thin;
    scrollbar-color: var(--muted-ink) var(--surface);
    
    &::-webkit-scrollbar {
      width: 8px;
    }
    
    &::-webkit-scrollbar-track {
      background: var(--surface);
      border-radius: var(--radius-sm);
    }
    
    &::-webkit-scrollbar-thumb {
      background: var(--muted-ink);
      border-radius: var(--radius-sm);
      
      &:hover {
        background: var(--ink);
      }
    }
  }
  
  &__controls {
    margin-top: var(--spacing-md);
    text-align: center;
  }
  
  &__show-all {
    padding: var(--spacing-sm) var(--spacing-lg);
    background: var(--surface);
    color: var(--ink);
    border: 1px solid var(--muted-ink);
    border-radius: var(--radius-md);
    font-size: 0.875rem;
    cursor: pointer;
    transition: all var(--transition-fast);
    
    &:hover {
      background: var(--accent-amber);
      color: var(--bg);
      border-color: var(--accent-amber);
    }
  }
}

@media (max-width: 640px) {
  .sms-thread {
    &__messages {
      padding: var(--spacing-md);
      max-height: 500px;
    }
  }
}
</style>
