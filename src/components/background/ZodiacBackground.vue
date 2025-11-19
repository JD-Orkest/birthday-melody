<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'

interface ZodiacSymbol {
  id: number
  char: string
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  color: string
  duration: number
}

const containerRef = ref<HTMLDivElement | null>(null)
const symbols = ref<ZodiacSymbol[]>([])

const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']

const colors = [
  '#E7B980',      // amber
  '#DDE7F3',      // ice
  '#E9C7C2',      // rose
  'rgba(231, 185, 128, 0.6)',
  'rgba(221, 231, 243, 0.6)',
  'rgba(233, 199, 194, 0.6)'
]

const initializeSymbols = () => {
  if (!containerRef.value) return
  
  const width = window.innerWidth
  const height = window.innerHeight
  const numberOfSymbols = Math.floor((width * height) / 20000) // Densité ajustée
  
  symbols.value = []
  
  for (let i = 0; i < numberOfSymbols; i++) {
    symbols.value.push({
      id: i,
      char: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)],
      x: Math.random() * 100, // Pourcentage
      y: Math.random() * 120 - 20, // Start un peu au-dessus
      size: Math.random() * 30 + 30,
      opacity: Math.random() * 0.4 + 0.2,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 30 + 40 // 40-70 secondes pour traverser
    })
  }
}

const animateSymbols = () => {
  symbols.value.forEach((symbol, index) => {
    // Animation de défilement vers le haut
    gsap.fromTo(
      symbol,
      { y: symbol.y },
      {
        y: -20,
        duration: symbol.duration,
        ease: 'none',
        repeat: -1,
        delay: index * 0.2,
        onRepeat: () => {
          symbol.y = 120
        }
      }
    )
    
    // Rotation continue
    gsap.to(symbol, {
      rotation: symbol.rotation + 360,
      duration: 20 + Math.random() * 20,
      ease: 'none',
      repeat: -1
    })
    
    // Pulsation d'opacité
    gsap.to(symbol, {
      opacity: symbol.opacity * 1.8,
      duration: 3 + Math.random() * 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 2
    })
  })
}

onMounted(() => {
  initializeSymbols()
  animateSymbols()
  
  const handleResize = () => {
    gsap.killTweensOf(symbols.value)
    initializeSymbols()
    animateSymbols()
  }
  
  window.addEventListener('resize', handleResize)
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize)
    gsap.killTweensOf(symbols.value)
  })
})
</script>

<template>
  <div ref="containerRef" class="zodiac-bg">
    <div 
      v-for="symbol in symbols" 
      :key="symbol.id"
      class="zodiac-bg__symbol"
      :style="{
        left: `${symbol.x}%`,
        top: `${symbol.y}%`,
        fontSize: `${symbol.size}px`,
        color: symbol.color,
        opacity: symbol.opacity,
        transform: `rotate(${symbol.rotation}deg)`
      }"
    >
      {{ symbol.char }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.zodiac-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  
  &__symbol {
    position: absolute;
    will-change: transform, opacity;
    filter: drop-shadow(0 0 10px currentColor);
    font-family: Arial, sans-serif;
    line-height: 1;
    user-select: none;
  }
}
</style>
