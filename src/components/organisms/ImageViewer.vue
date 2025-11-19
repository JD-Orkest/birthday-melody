<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  isOpen: boolean
  imageSrc: string
  caption: string
  currentIndex: number
  totalImages: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'next'): void
  (e: 'prev'): void
}>()

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const imageRef = ref<HTMLImageElement | null>(null)
const isLandscape = ref(false)

// Gestion du swipe
const handleTouchStart = (e: TouchEvent) => {
  isDragging.value = true
  startX.value = e.touches[0].clientX
  currentX.value = 0
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  const clientX = e.touches[0].clientX
  currentX.value = clientX - startX.value
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  
  const threshold = 50 // Seuil réduit pour plus de réactivité
  
  if (currentX.value > threshold) {
    emit('prev')
  } else if (currentX.value < -threshold) {
    emit('next')
  }
  
  isDragging.value = false
  currentX.value = 0
}

// Téléchargement
const downloadImage = async () => {
  try {
    const response = await fetch(props.imageSrc)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.imageSrc.split('/').pop() || 'photo.jpeg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur téléchargement:', error)
  }
}

// Détection de l'orientation de l'image pour le placement du texte
const onImageLoad = (e: Event) => {
  const img = e.target as HTMLImageElement
  // Si l'image est plus large que haute ou presque carrée
  isLandscape.value = img.naturalWidth > img.naturalHeight * 0.8
}

// Clavier
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.isOpen) return
  if (e.key === 'Escape') emit('close')
  if (e.key === 'ArrowLeft') emit('prev')
  if (e.key === 'ArrowRight') emit('next')
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="isOpen" class="viewer">
      <!-- Background flou -->
      <div class="viewer__bg">
        <img :src="imageSrc" alt="" class="viewer__bg-img" />
        <div class="viewer__bg-overlay"></div>
      </div>

      <!-- Header (Boutons) -->
      <header class="viewer__header">
        <button class="viewer__btn viewer__btn--back" @click="$emit('close')">
          <font-awesome-icon icon="arrow-left" />
        </button>
        
        <div class="viewer__counter">
          {{ currentIndex + 1 }} / {{ totalImages }}
        </div>

        <button class="viewer__btn viewer__btn--download" @click="downloadImage">
          <font-awesome-icon icon="download" />
        </button>
      </header>

      <!-- Zone principale (Image + Swipe) -->
      <main 
        class="viewer__main"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <!-- Navigation Desktop (Flèches latérales) -->
        <button class="viewer__nav viewer__nav--prev" @click.stop="$emit('prev')">
          <font-awesome-icon icon="chevron-left" />
        </button>

        <div 
          class="viewer__image-container"
          :style="{ transform: `translateX(${currentX}px)` }"
        >
          <img 
            ref="imageRef"
            :src="imageSrc" 
            :alt="caption"
            class="viewer__img"
            @load="onImageLoad"
            draggable="false"
          />
        </div>

        <button class="viewer__nav viewer__nav--next" @click.stop="$emit('next')">
          <font-awesome-icon icon="chevron-right" />
        </button>
      </main>

      <!-- Légende (Footer) -->
      <footer class="viewer__footer" :class="{ 'viewer__footer--overlay': !isLandscape }">
        <div class="viewer__caption-content">
          <p>{{ caption }}</p>
        </div>
      </footer>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
.viewer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  background: #000;

  // Arrière-plan
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
      background: rgba(0, 0, 0, 0.7); // Assombrit le fond
    }
  }

  // Header
  &__header {
    position: relative;
    z-index: 10;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-md);
    margin-top: env(safe-area-inset-top); // Support encoche iPhone
  }

  &__counter {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
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
    transition: background 0.2s;

    &:active {
      background: rgba(255, 255, 255, 0.3);
    }
  }

  // Main Content
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
    transition: transform 0.1s linear;
    padding: var(--spacing-sm);
  }

  &__img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    user-select: none;
  }

  // Navigation Desktop
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
    transition: all 0.2s;
    z-index: 20;

    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    &--prev { left: 20px; }
    &--next { right: 20px; }

    @media (max-width: 768px) {
      display: none; // On cache les flèches sur mobile (swipe uniquement)
    }
  }

  // Footer / Légende
  &__footer {
    position: relative;
    z-index: 10;
    width: 100%;
    padding: var(--spacing-md);
    padding-bottom: calc(var(--spacing-md) + env(safe-area-inset-bottom));
    text-align: center;
    color: white;
    
    // Style par défaut (en dessous de l'image, dans le flou)
    background: transparent;

    // Style Overlay (pour les images portrait qui prennent tout l'écran)
    &--overlay {
      position: absolute;
      bottom: 0;
      left: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 60%, transparent 100%);
      padding-top: 60px; // Espace pour le dégradé
    }
  }

  &__caption-content {
    font-size: 1rem;
    line-height: 1.5;
    font-style: italic;
    text-shadow: 0 2px 4px rgba(0,0,0,0.5);
    max-width: 600px;
    margin: 0 auto;
  }
}
</style>