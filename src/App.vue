<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import ZodiacBackground from '@/components/background/ZodiacBackground.vue'
</script>

<template>
  <div id="app">
    <ZodiacBackground />
    <AppHeader />
    
    <main class="app-main">
      <router-view v-slot="{ Component, route }">
        <transition :name="(route.meta.transition as string) || 'fade'" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <AppFooter />
  </div>
</template>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

// Page transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .fade-enter-active,
  .fade-leave-active {
    transition: none;
  }
}
</style>
