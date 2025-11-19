<script setup lang="ts">
import { ref } from 'vue'

interface Tab {
  id: string
  label: string
}

interface TabsProps {
  tabs: Tab[]
  modelValue?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [tabId: string]
}>()

const activeTab = ref(props.modelValue || (props.tabs[0]?.id ?? ''))

const selectTab = (tabId: string) => {
  activeTab.value = tabId
  emit('update:modelValue', tabId)
}
</script>

<template>
  <div class="tabs">
    <div class="tabs__nav" role="tablist" :aria-label="'Navigation par onglets'">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        class="tabs__button"
        :class="{ 'tabs__button--active': activeTab === tab.id }"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="activeTab === tab.id ? 0 : -1"
        @click="selectTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>
    
    <div class="tabs__content">
      <div
        v-for="tab in tabs"
        :id="`panel-${tab.id}`"
        :key="tab.id"
        role="tabpanel"
        class="tabs__panel"
        :class="{ 'tabs__panel--active': activeTab === tab.id }"
        :aria-labelledby="`tab-${tab.id}`"
        :hidden="activeTab !== tab.id"
      >
        <slot :name="tab.id" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  width: 100%;
  
  &__nav {
    display: flex;
    gap: var(--spacing-sm);
    border-bottom: 2px solid var(--surface);
    margin-bottom: var(--spacing-lg);
    overflow-x: auto;
    scrollbar-width: thin;
    scrollbar-color: var(--muted-ink) var(--surface);
  }
  
  &__button {
    padding: var(--spacing-md) var(--spacing-lg);
    background: transparent;
    border: none;
    color: var(--muted-ink);
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    position: relative;
    transition: all var(--transition-fast);
    white-space: nowrap;
    min-height: 44px;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--accent-amber);
      transform: scaleX(0);
      transition: transform var(--transition-fast);
    }
    
    &:hover {
      color: var(--ink);
    }
    
    &--active {
      color: var(--accent-amber);
      
      &::after {
        transform: scaleX(1);
      }
    }
    
    &:focus-visible {
      outline: 2px solid var(--accent-amber);
      outline-offset: 4px;
      border-radius: var(--radius-sm);
    }
  }
  
  &__content {
    position: relative;
  }
  
  &__panel {
    display: none;
    animation: fade-in 0.2s ease-out;
    
    &--active {
      display: block;
    }
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 640px) {
  .tabs {
    &__nav {
      gap: 0;
    }
    
    &__button {
      padding: var(--spacing-sm) var(--spacing-md);
      font-size: 0.875rem;
    }
  }
}
</style>
