<script setup lang="ts">
import { ref, computed } from 'vue'
import Tabs from '@/components/molecules/Tabs.vue'
import type { GalleryImages } from '@/data/content'

interface GalleryProps {
  images: GalleryImages
}

const props = defineProps<GalleryProps>()

const currentTab = ref<'elle' | 'nous' | 'eux'>('elle')
const selectedIndex = ref<number>(0)
const showDetailView = ref(false)
const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)

const tabs = [
  { id: 'elle', label: 'Toi' },
  { id: 'nous', label: 'Nous' },
  { id: 'eux', label: 'Eux' }
]

const currentImages = computed(() => {
  return props.images[currentTab.value] || []
})

const selectedImage = computed(() => {
  return currentImages.value[selectedIndex.value]
})

const canGoPrev = computed(() => selectedIndex.value > 0)
const canGoNext = computed(() => selectedIndex.value < currentImages.value.length - 1)

const handleTabChange = (tabId: string) => {
  currentTab.value = tabId as 'elle' | 'nous' | 'eux'
}

const openDetailView = (index: number) => {
  selectedIndex.value = index
  showDetailView.value = true
  
  // Masquer le header et le footer sur mobile
  const header = document.querySelector('.app-header') as HTMLElement
  const footer = document.querySelector('.app-footer') as HTMLElement
  if (header) {
    header.style.visibility = 'hidden'
  }
  if (footer) {
    footer.style.visibility = 'hidden'
  }
  document.body.style.overflow = 'hidden'
}

const closeDetailView = () => {
  showDetailView.value = false
  currentX.value = 0
  isDragging.value = false
  
  // Restaurer le header et le footer
  const header = document.querySelector('.app-header') as HTMLElement
  const footer = document.querySelector('.app-footer') as HTMLElement
  if (header) {
    header.style.visibility = ''
  }
  if (footer) {
    footer.style.visibility = ''
  }
  document.body.style.overflow = ''
}

const goToPrev = () => {
  if (canGoPrev.value) {
    selectedIndex.value--
  }
}

const goToNext = () => {
  if (canGoNext.value) {
    selectedIndex.value++
  }
}

// Touch/Mouse handlers pour swipe
const handleTouchStart = (e: TouchEvent | MouseEvent) => {
  isDragging.value = true
  startX.value = 'touches' in e ? e.touches[0].clientX : e.clientX
  currentX.value = 0
}

const handleTouchMove = (e: TouchEvent | MouseEvent) => {
  if (!isDragging.value) return
  
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  currentX.value = clientX - startX.value
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const threshold = 100
  
  if (currentX.value > threshold && canGoPrev.value) {
    goToPrev()
  } else if (currentX.value < -threshold && canGoNext.value) {
    goToNext()
  }
  
  isDragging.value = false
  currentX.value = 0
}

const downloadImage = async (imageSrc: string) => {
  try {
    const response = await fetch(imageSrc)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = imageSrc.split('/').pop() || 'photo.jpeg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
  }
}
</script>

<template>
  <div class="gallery">
    <!-- Vue grille si pas de détail affiché -->
    <div v-if="!showDetailView" class="gallery__grid-view">
      <Tabs
        :tabs="tabs"
        :model-value="currentTab"
        @update:model-value="handleTabChange"
      >
        <template #elle>
          <div class="gallery__grid">
            <figure
              v-for="(item, index) in images.elle"
              :key="`elle-${index}`"
              class="gallery__item"
              @click="openDetailView(index)"
            >
              <img
                :src="item.src"
                :alt="item.caption"
                loading="lazy"
                class="gallery__image"
              />
              <figcaption class="gallery__caption">
                {{ item.caption }}
              </figcaption>
            </figure>
          </div>
        </template>
        
        <template #nous>
          <div class="gallery__grid">
            <figure
              v-for="(item, index) in images.nous"
              :key="`nous-${index}`"
              class="gallery__item"
              @click="openDetailView(index)"
            >
              <img
                :src="item.src"
                :alt="item.caption"
                loading="lazy"
                class="gallery__image"
              />
              <figcaption class="gallery__caption">
                {{ item.caption }}
              </figcaption>
            </figure>
          </div>
        </template>
        
        <template #eux>
          <div class="gallery__grid">
            <figure
              v-for="(item, index) in images.eux"
              :key="`eux-${index}`"
              class="gallery__item"
              @click="openDetailView(index)"
            >
              <img
                :src="item.src"
                :alt="item.caption"
                loading="lazy"
                class="gallery__image"
              />
              <figcaption class="gallery__caption">
                {{ item.caption }}
              </figcaption>
            </figure>
          </div>
        </template>
      </Tabs>
    </div>

    <!-- Vue détail photo -->
    <div 
      v-else 
      class="gallery__detail-view"
    >
      <!-- Header avec navigation -->
      <div class="gallery__detail-header">
        <button 
          type="button"
          class="gallery__detail-back"
          @click="closeDetailView"
          title="Retour"
        >
          <font-awesome-icon icon="arrow-left" />
        </button>
        
        <button 
          type="button"
          class="gallery__detail-download"
          @click="downloadImage(selectedImage.src)"
          title="Télécharger"
        >
          <font-awesome-icon icon="download" />
        </button>
      </div>

      <!-- Navigation latérale pour desktop uniquement -->
      <button 
        v-if="canGoPrev"
        type="button"
        class="gallery__detail-nav gallery__detail-nav--prev"
        @click="goToPrev"
        title="Image précédente"
      >
        <font-awesome-icon icon="chevron-left" />
      </button>
      
      <button 
        v-if="canGoNext"
        type="button"
        class="gallery__detail-nav gallery__detail-nav--next"
        @click="goToNext"
        title="Image suivante"
      >
        <font-awesome-icon icon="chevron-right" />
      </button>

      <!-- Contenu -->
      <div 
        class="gallery__detail-content"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
        @mousedown="handleTouchStart"
        @mousemove="handleTouchMove"
        @mouseup="handleTouchEnd"
        @mouseleave="handleTouchEnd"
      >
        <!-- Arrière-plan flou -->
        <div class="gallery__detail-background">
          <img 
            :src="selectedImage.src" 
            class="gallery__detail-background-image"
            alt=""
          />
        </div>

        <div 
          class="gallery__detail-image-wrapper"
          :style="{ transform: `translateX(${currentX}px)` }"
        >
          <img 
            :src="selectedImage.src" 
            :alt="selectedImage.caption"
            class="gallery__detail-image"
            draggable="false"
          />
        </div>
        
        <div class="gallery__detail-info">
          <p class="gallery__detail-caption">
            {{ selectedImage.caption }}
          </p>
          <div class="gallery__detail-counter">
            {{ selectedIndex + 1 }} / {{ currentImages.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.gallery {
  width: 100%;
  
  &__grid-view {
    width: 100%;
  }
  
  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--spacing-md);
    
    @media (max-width: 640px) {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: var(--spacing-sm);
    }
  }
  
  &__item {
    margin: 0;
    position: relative;
    overflow: hidden;
    border-radius: var(--radius-md);
    background: var(--surface);
    box-shadow: var(--shadow-sm);
    transition: all var(--transition-normal);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    
    &:hover {
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
      
      .gallery__image {
        transform: scale(1.05);
      }
    }
  }
  
  &__image {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    transition: transform var(--transition-slow);
  }
  
  &__caption {
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--surface);
    color: var(--muted-ink);
    font-size: 0.8125rem;
    font-style: italic;
    text-align: center;
    line-height: 1.4;
    border-top: 1px solid rgba(231, 185, 128, 0.1);
    
    @media (max-width: 640px) {
      padding: var(--spacing-xs) var(--spacing-sm);
      font-size: 0.75rem;
    }
  }

  // Vue détail
  &__detail-view {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100dvh;
    background: #000;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &__detail-header {
    position: relative;
    width: 100%;
    height: 64px;
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-md);
    z-index: 10;
    flex-shrink: 0;
    
    @media (max-width: 640px) {
      height: 56px;
      padding: 0 var(--spacing-sm);
      margin-top: env(safe-area-inset-top);
    }
  }

  &__detail-back,
  &__detail-download {
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    transition: all var(--transition-fast);
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }
    
    @media (max-width: 640px) {
      width: 44px;
      height: 44px;
      font-size: 1.125rem;
      background: rgba(0, 0, 0, 0.5);
      
      &:hover {
        background: rgba(0, 0, 0, 0.7);
      }
    }
  }

  &__detail-nav {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    width: 64px;
    height: 64px;
    border: none;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    transition: all var(--transition-fast);
    z-index: 5;
    opacity: 0.7;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: translateY(-50%) scale(1.1);
      opacity: 1;
    }
    
    &--prev {
      left: var(--spacing-xl);
    }
    
    &--next {
      right: var(--spacing-xl);
    }
    
    @media (max-width: 640px) {
      display: none;
    }
  }

  &__detail-content {
    width: 100%;
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 0;
  }

  &__detail-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    overflow: hidden;
    opacity: 0.5;
    pointer-events: none;
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
  }

  &__detail-background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.1);
  }

  &__detail-image-wrapper {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-md);
    padding-bottom: 80px; /* Espace pour la légende */
    z-index: 1;
    transition: transform 0.2s ease-out;
    
    @media (max-width: 640px) {
      padding: var(--spacing-sm);
      padding-bottom: 100px; /* Plus d'espace sur mobile pour la légende */
    }
  }

  &__detail-image {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    pointer-events: none;
    position: relative;
    z-index: 2;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
  }

  &__detail-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    padding: var(--spacing-xl) var(--spacing-lg) var(--spacing-lg);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.6) 60%, transparent 100%);
    text-align: center;
    pointer-events: none;
    
    @media (max-width: 640px) {
      padding: var(--spacing-lg) var(--spacing-md) var(--spacing-md);
    }
  }

  &__detail-caption {
    color: rgba(255, 255, 255, 0.95);
    font-size: 1rem;
    font-style: italic;
    line-height: 1.6;
    margin: 0 0 var(--spacing-sm);
    
    @media (max-width: 640px) {
      font-size: 0.9375rem;
      line-height: 1.5;
    }
  }

  &__detail-counter {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.8125rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }
}
</style>
