<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const canvasRef = ref<HTMLCanvasElement | null>(null)
const zodiacSigns = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓']
const symbols = ref<Array<{
  char: string
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  rotation: number
  rotationSpeed: number
}>>([])

let animationId: number | null = null
let ctx: CanvasRenderingContext2D | null = null

const initializeSymbols = (width: number, height: number) => {
  symbols.value = []
  const numberOfSymbols = Math.floor((width * height) / 15000)
  
  for (let i = 0; i < numberOfSymbols; i++) {
    symbols.value.push({
      char: zodiacSigns[Math.floor(Math.random() * zodiacSigns.length)],
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 30 + 20,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.3 + 0.1,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 0.5
    })
  }
}

const drawSymbol = (symbol: typeof symbols.value[0]) => {
  if (!ctx) return
  
  ctx.save()
  ctx.translate(symbol.x, symbol.y)
  ctx.rotate((symbol.rotation * Math.PI) / 180)
  
  ctx.font = `${symbol.size}px Arial`
  ctx.fillStyle = `rgba(231, 185, 128, ${symbol.opacity})`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(symbol.char, 0, 0)
  
  ctx.restore()
}

const animate = () => {
  if (!ctx || !canvasRef.value) return
  
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  
  symbols.value.forEach(symbol => {
    // Déplacement vertical
    symbol.y -= symbol.speed
    symbol.rotation += symbol.rotationSpeed
    
    // Réapparition en bas quand sort par le haut
    if (symbol.y < -50) {
      symbol.y = canvasRef.value!.height + 50
      symbol.x = Math.random() * canvasRef.value!.width
    }
    
    drawSymbol(symbol)
  })
  
  animationId = requestAnimationFrame(animate)
}

const setupCanvas = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  const parent = canvas.parentElement
  if (!parent) return
  
  canvas.width = parent.clientWidth
  canvas.height = parent.clientHeight
  
  ctx = canvas.getContext('2d')
  if (!ctx) return
  
  initializeSymbols(canvas.width, canvas.height)
}

const handleResize = () => {
  setupCanvas()
}

onMounted(() => {
  setupCanvas()
  animate()
  
  // GSAP Animation au scroll
  if (canvasRef.value) {
    gsap.to(canvasRef.value, {
      opacity: 0.6,
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    })
  }
  
  // Animation de pulsation subtile
  symbols.value.forEach((symbol, index) => {
    gsap.to(symbol, {
      opacity: symbol.opacity * 1.5,
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: index * 0.1
    })
  })
  
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  if (animationId !== null) {
    cancelAnimationFrame(animationId)
  }
  window.removeEventListener('resize', handleResize)
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <div class="constellation-bg">
    <canvas ref="canvasRef" class="constellation-bg__canvas"></canvas>
  </div>
</template>

<style scoped lang="scss">
.constellation-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
  
  &__canvas {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }
}
</style>

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrame: number | null = null

// Constellation du Sagittaire (positions relatives)
const sagittariusStars = [
  { x: 0.5, y: 0.3, size: 2.5, name: 'Kaus Australis' },
  { x: 0.45, y: 0.35, size: 2, name: 'Kaus Media' },
  { x: 0.42, y: 0.4, size: 1.8, name: 'Kaus Borealis' },
  { x: 0.55, y: 0.32, size: 1.5, name: 'Ascella' },
  { x: 0.48, y: 0.28, size: 1.5, name: 'Nunki' },
  { x: 0.52, y: 0.38, size: 1.3, name: 'Phi Sgr' },
  { x: 0.58, y: 0.35, size: 1.2, name: 'Sigma Sgr' },
  { x: 0.46, y: 0.42, size: 1.2, name: 'Tau Sgr' }
]

// Lignes de la constellation du Sagittaire (indices des étoiles à connecter)
const sagittariusLines = [
  [0, 1], [1, 2], [1, 5], [0, 3], [3, 4], [3, 6], [5, 7]
]

// Autres étoiles décoratives
const decorativeStars: Array<{ x: number; y: number; size: number; twinkle: number }> = []

const initCanvas = () => {
  if (!canvasRef.value) return
  
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  
  // Set canvas size
  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = document.documentElement.scrollHeight
  }
  resize()
  window.addEventListener('resize', resize)
  
  // Generate decorative stars
  for (let i = 0; i < 80; i++) {
    decorativeStars.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.3,
      twinkle: Math.random() * Math.PI * 2
    })
  }
  
  // Initial draw
  draw()
  
  // Setup GSAP scroll animations
  setupScrollAnimations()
}

const draw = () => {
  if (!ctx || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const w = canvas.width
  const h = canvas.height
  
  // Clear canvas
  ctx.clearRect(0, 0, w, h)
  
  // Draw decorative stars
  decorativeStars.forEach(star => {
    if (!ctx) return
    const alpha = 0.3 + Math.sin(star.twinkle) * 0.2
    ctx.fillStyle = `rgba(221, 231, 243, ${alpha})`
    ctx.beginPath()
    ctx.arc(star.x * w, star.y * h, star.size, 0, Math.PI * 2)
    ctx.fill()
    
    star.twinkle += 0.02
  })
  
  // Draw Sagittarius constellation
  drawSagittarius()
  
  animationFrame = requestAnimationFrame(draw)
}

const drawSagittarius = () => {
  if (!ctx || !canvasRef.value) return
  
  const canvas = canvasRef.value
  const w = canvas.width
  
  // Calculate position (centered on viewport initially)
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  const offsetY = scrollY + viewportHeight * 0.4
  
  // Draw constellation lines
  ctx.strokeStyle = 'rgba(231, 185, 128, 0.3)'
  ctx.lineWidth = 1
  
  sagittariusLines.forEach(([startIdx, endIdx]) => {
    if (!ctx) return
    const start = sagittariusStars[startIdx]
    const end = sagittariusStars[endIdx]
    
    ctx.beginPath()
    ctx.moveTo(start.x * w, offsetY + (start.y - 0.3) * viewportHeight)
    ctx.lineTo(end.x * w, offsetY + (end.y - 0.3) * viewportHeight)
    ctx.stroke()
  })
  
  // Draw stars
  sagittariusStars.forEach(star => {
    if (!ctx) return
    const x = star.x * w
    const y = offsetY + (star.y - 0.3) * viewportHeight
    
    // Star glow
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, star.size * 4)
    gradient.addColorStop(0, 'rgba(231, 185, 128, 0.8)')
    gradient.addColorStop(0.5, 'rgba(231, 185, 128, 0.3)')
    gradient.addColorStop(1, 'rgba(231, 185, 128, 0)')
    
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, star.size * 4, 0, Math.PI * 2)
    ctx.fill()
    
    // Star core
    ctx.fillStyle = 'rgba(242, 239, 234, 0.9)'
    ctx.beginPath()
    ctx.arc(x, y, star.size, 0, Math.PI * 2)
    ctx.fill()
  })
}

const setupScrollAnimations = () => {
  if (!canvasRef.value) return
  
  // Animate constellation on scroll
  gsap.to('.constellation-canvas', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1
    },
    opacity: 1
  })
  
  // Parallax effect for constellation
  gsap.to(sagittariusStars, {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 2,
      onUpdate: (self) => {
        // Subtle rotation and movement based on scroll
        const progress = self.progress
        sagittariusStars.forEach((star, index) => {
          star.x = 0.5 + (star.x - 0.5) * (1 + progress * 0.1) + Math.sin(progress * Math.PI + index) * 0.02
          star.y = 0.3 + (star.y - 0.3) * (1 + progress * 0.15) + Math.cos(progress * Math.PI + index) * 0.02
        })
      }
    }
  })
  
  // Pulse animation for constellation
  gsap.to('.constellation-canvas', {
    scrollTrigger: {
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true
    },
    filter: 'brightness(1.2)',
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  })
}

onMounted(() => {
  initCanvas()
})

onUnmounted(() => {
  if (animationFrame) {
    cancelAnimationFrame(animationFrame)
  }
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})
</script>

<template>
  <canvas
    ref="canvasRef"
    class="constellation-canvas"
    aria-hidden="true"
  />
</template>

<style scoped lang="scss">
.constellation-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  opacity: 0.7;
  transition: opacity var(--transition-slow);
}

@media (prefers-reduced-motion: reduce) {
  .constellation-canvas {
    display: none;
  }
}
</style>
