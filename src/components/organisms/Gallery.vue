<script setup lang="ts">
import { ref, computed } from 'vue'
import Tabs from '@/components/molecules/Tabs.vue'
import ImageViewer from '@/components/organisms/ImageViewer.vue'
import type { GalleryImages } from '@/data/content'

interface GalleryProps {
  images: GalleryImages
}

const props = defineProps<GalleryProps>()

const currentTab = ref<'elle' | 'nous' | 'eux'>('elle')
const selectedIndex = ref<number>(0)
const isViewerOpen = ref(false)

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

const handleTabChange = (tabId: string) => {
  currentTab.value = tabId as 'elle' | 'nous' | 'eux'
}

const openViewer = (index: number) => {
  selectedIndex.value = index
  isViewerOpen.value = true
}

const closeViewer = () => {
  isViewerOpen.value = false
}

const nextImage = () => {
  if (selectedIndex.value < currentImages.value.length - 1) {
    selectedIndex.value++
  }
}

const prevImage = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}
</script>

<template>
  <div class="gallery">
    <div class="gallery__grid-view">
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
              @click="openViewer(index)"
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
              @click="openViewer(index)"
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
              @click="openViewer(index)"
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

    <ImageViewer
      :is-open="isViewerOpen"
      :image-src="selectedImage?.src"
      :caption="selectedImage?.caption"
      :current-index="selectedIndex"
      :total-images="currentImages.length"
      @close="closeViewer"
      @next="nextImage"
      @prev="prevImage"
    />
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
}
</style>
