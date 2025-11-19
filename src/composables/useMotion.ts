import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export interface MotionOptions {
  duration?: number
  delay?: number
  stagger?: number
  ease?: string
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Animate page entry with fade and slide up - Enhanced
 */
export function enterPage(
  element: HTMLElement | Element | null,
  options: MotionOptions = {}
): gsap.core.Tween | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  const { duration = 0.6, delay = 0, ease = 'power3.out' } = options

  return gsap.fromTo(
    element,
    { opacity: 0, y: 30, scale: 0.98 },
    { opacity: 1, y: 0, scale: 1, duration, delay, ease }
  )
}

/**
 * Stagger reveal animation - Enhanced with scale
 */
export function staggerReveal(
  elements: HTMLElement[] | NodeListOf<Element> | Element[] | null,
  options: MotionOptions = {}
): gsap.core.Timeline | null {
  if (!elements || elements.length === 0 || prefersReducedMotion()) {
    return null
  }

  const { duration = 0.5, delay = 0.1, stagger = 0.1, ease = 'power3.out' } = options

  const tl = gsap.timeline()
  tl.fromTo(
    elements,
    { opacity: 0, y: 20, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration, stagger, delay, ease }
  )

  return tl
}

/**
 * Scroll-triggered fade in animation
 */
export function scrollFadeIn(
  element: HTMLElement | Element,
  options: MotionOptions = {}
): gsap.core.Tween | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  const { duration = 0.8, ease = 'power2.out' } = options

  return gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration,
      ease,
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  )
}

/**
 * Parallax scroll effect
 */
export function parallaxScroll(
  element: HTMLElement | Element,
  speed: number = 0.5
): ScrollTrigger | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  return ScrollTrigger.create({
    trigger: element,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      const y = (self.progress - 0.5) * speed * 100
      gsap.set(element, { y })
    }
  })
}

/**
 * Magnetic button effect
 */
export function magneticButton(button: HTMLElement): { destroy: () => void } | null {
  if (!button || prefersReducedMotion()) {
    return null
  }

  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)'
    })
  }

  button.addEventListener('mousemove', handleMouseMove)
  button.addEventListener('mouseleave', handleMouseLeave)

  return {
    destroy: () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }
}

/**
 * Floating animation
 */
export function floatAnimation(
  element: HTMLElement | Element,
  options: { distance?: number; duration?: number } = {}
): gsap.core.Tween | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  const { distance = 10, duration = 3 } = options

  return gsap.to(element, {
    y: `-=${distance}`,
    duration,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true
  })
}

/**
 * Text reveal animation - word by word
 */
export function revealText(
  element: HTMLElement,
  options: MotionOptions = {}
): gsap.core.Timeline | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  const { duration = 0.05, stagger = 0.03, ease = 'power2.out' } = options

  const text = element.textContent || ''
  const words = text.split(' ')
  
  element.innerHTML = words
    .map(word => `<span class="word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
    .join(' ')

  const wordElements = element.querySelectorAll('.word > span')

  const tl = gsap.timeline()
  tl.fromTo(
    wordElements,
    { y: '100%', opacity: 0 },
    { y: '0%', opacity: 1, duration, stagger, ease }
  )

  return tl
}

/**
 * Animate element with scale and shadow on hover
 */
export function hoverScale(
  element: HTMLElement | Element | null,
  scale = 1.01
): { enter: () => void; leave: () => void } | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  return {
    enter: () => {
      gsap.to(element, { scale, duration: 0.2, ease: 'power1.out' })
    },
    leave: () => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: 'power1.out' })
    }
  }
}

/**
 * Pulse animation (for final reveal)
 */
export function pulse(
  element: HTMLElement | Element | null,
  options: { from?: number; to?: number; duration?: number } = {}
): gsap.core.Tween | null {
  if (!element || prefersReducedMotion()) {
    return null
  }

  const { from = 0.85, to = 1, duration = 1.8 } = options

  return gsap.fromTo(
    element,
    { opacity: from },
    {
      opacity: to,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    }
  )
}

/**
 * Sequential reveal for SMS bubbles
 */
export function revealMessages(
  elements: HTMLElement[] | NodeListOf<Element> | Element[],
  interval = 0.22
): gsap.core.Timeline | null {
  if (!elements || elements.length === 0) {
    return null
  }

  if (prefersReducedMotion()) {
    // Show all at once if reduced motion is preferred
    gsap.set(elements, { opacity: 1, y: 0 })
    return null
  }

  const tl = gsap.timeline()
  elements.forEach((el, index) => {
    tl.fromTo(
      el,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
      index * interval
    )
  })

  return tl
}

/**
 * Typewriter effect for text
 */
export function typewriter(
  element: HTMLElement | Element | null,
  options: MotionOptions = {}
): gsap.core.Timeline | null {
  if (!element || prefersReducedMotion()) {
    if (element) gsap.set(element, { opacity: 1 })
    return null
  }

  const { duration = 0.02, stagger = 0.02 } = options

  // Split text into spans
  const text = element.textContent || ''
  element.textContent = ''
  
  const chars = text.split('').map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.opacity = '0'
    element.appendChild(span)
    return span
  })

  const tl = gsap.timeline()
  tl.to(chars, {
    opacity: 1,
    duration,
    stagger,
    ease: 'none'
  })

  return tl
}

/**
 * Focus trap for modals
 */
export function focusTrap(container: HTMLElement): () => void {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus()
        e.preventDefault()
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus()
        e.preventDefault()
      }
    }
  }

  container.addEventListener('keydown', handleKeyDown)
  firstElement?.focus()

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown)
  }
}
