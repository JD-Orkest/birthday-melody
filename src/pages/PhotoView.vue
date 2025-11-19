<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { GALLERY } from '@/data/content'

const route = useRoute()
const router = useRouter()

// Récupérer les paramètres de l'URL
const category = computed(() => route.params.category as 'elle' | 'nous' | 'eux')
const index = computed(() => parseInt(route.params.index as string))

// Récupérer toutes les images de la catégorie actuelle
const images = computed(() => GALLERY[category.value] || [])
const currentImage = computed(() => images.value[index.value])

// État pour l'animation
const direction = ref<'next' | 'prev'>('next')

// Navigation
const close = () => {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/etape/2')
  }
}

const next = () => {
  if (index.value < images.value.length - 1) {
    direction.value = 'next'
    router.replace({
      name: 'PhotoView',
      params: { category: category.value, index: index.value + 1 }
    })
  }
}

const prev = () => {
  if (index.value > 0) {
    direction.value = 'prev'
    router.replace({
      name: 'PhotoView',
      params: { category: category.value, index: index.value - 1 }
    })
  }
}

// Swipe
const startX = ref(0)
const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
}

const handleTouchEnd = (e: TouchEvent) => {
  const endX = e.changedTouches[0].clientX
  const diff = startX.value - endX
  
  if (Math.abs(diff) > 50) {
    if (diff > 0) next()
    else prev()
  }
}

// Clavier
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

// Téléchargement
const downloadImage = async () => {
  try {
    const response = await fetch(currentImage.value.src)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = currentImage.value.src.split('/').pop() || 'photo.jpeg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur téléchargement:', error)
  }
}
</script>

<template>
  <div class="photo-view">
    <!-- Background flou -->
    <div class="photo-view__bg">
      <transition name="fade" mode="out-in">
        <img 
          :key="currentImage.src"
          :src="currentImage.src" 
          alt="" 
          class="photo-view__bg-img" 
        />
      </transition>
      <div class="photo-view__bg-overlay"></div>
    </div>

    <!-- Header -->
    <header class="photo-view__header">
      <button class="photo-view__btn" @click="close">
        <font-awesome-icon icon="arrow-left" />
      </button>
      
      <div class="photo-view__counter">
        {{ index + 1 }} / {{ images.length }}
      </div>

      <button class="photo-view__btn" @click="downloadImage">
        <font-awesome-icon icon="download" />
      </button>
    </header>

    <!-- Main Content -->
    <main 
      class="photo-view__main"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <!-- Navigation Desktop -->
      <button 
        v-if="index > 0"
        class="photo-view__nav photo-view__nav--prev" 
        @click="prev"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>

            <div class="photo-view__image-container">
        <transition :name="direction === 'next' ? 'slide-left' : 'slide-right'">
          <img 
            :key="currentImage.src"
            :src="currentImage.src" 
            :alt="currentImage.caption"
            class="photo-view__img"
            draggable="false"
          />
        </transition>
      </div>

      <button 
        v-if="index < images.length - 1"
        class="photo-view__nav photo-view__nav--next" 
        @click="next"
      >
        <font-awesome-icon icon="chevron-right" />
      </button>
    </main>

    <!-- Footer / Caption -->
    <footer class="photo-view__footer">
      <transition name="fade" mode="out-in">
        <p :key="currentImage.caption">{{ currentImage.caption }}</p>
      </transition>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.photo-view {
  position: fixed;
  inset: 0;
  height: 100dvh;
  background: #000;
  z-index: 9999;
  display: flex;
  flex-direction: column;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;

    &-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(30px);
      transform: scale(1.1);
      opacity: 0.6;
    }

    &-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
    }
  }

  &__header {
    position: relative;
    z-index: 10;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-md);
    margin-top: env(safe-area-inset-top);
  }

  &__counter {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }

  &__btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    backdrop-filter: blur(10px);

    &:active {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  &__main {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
  }

  &__image-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-sm);
    perspective: 1000px;
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  }

  &__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 20;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &--prev { left: 20px; }
    &--next { right: 20px; }

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__footer {
    position: relative;
    z-index: 10;
    padding: var(--spacing-md);
    padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
    text-align: center;
    color: white;
    background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);

    p {
      font-size: 1rem;
      font-style: italic;
      max-width: 600px;
      margin: 0 auto;
      text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
  }
}

// Transitions
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.slide-left-enter-from {
  transform: translateX(100%);
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from {
  transform: translateX(-100%);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
