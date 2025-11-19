import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { CODES } from '@/data/content'

const STORAGE_KEY = 'anniversaire-melo-progress'

/**
 * Normalize string for comparison: remove accents, trim, lowercase
 */
function normalize(str: string): string {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

interface ProgressState {
  unlocked: Record<number, boolean>
  attempts: Record<number, number>
}

export const useProgressStore = defineStore('progress', () => {
  // State
  const unlocked = ref<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  })

  const attempts = ref<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  })

  // Computed
  const totalSteps = computed(() => Object.keys(CODES).length)
  const unlockedCount = computed(() => Object.values(unlocked.value).filter(Boolean).length)
  const progress = computed(() => Math.round((unlockedCount.value / totalSteps.value) * 100))
  
  const isStepUnlocked = computed(() => (step: number) => unlocked.value[step] === true)
  
  const canAccessStep = computed(() => (step: number) => {
    // Step 1 is always accessible
    if (step === 1) return true
    // Other steps require previous step to be unlocked
    return unlocked.value[step - 1] === true
  })

  // Actions
  function validate(step: number, input: string): boolean {
    const expectedCode = CODES[step]
    if (!expectedCode) {
      console.error(`No code defined for step ${step}`)
      return false
    }

    attempts.value[step] = (attempts.value[step] || 0) + 1
    
    const normalizedInput = normalize(input)
    const normalizedExpected = normalize(expectedCode)
    
    const isValid = normalizedInput === normalizedExpected
    
    if (isValid) {
      unlocked.value[step] = true
      saveToLocalStorage()
    } else {
      saveToLocalStorage() // Save attempts even on failure
    }
    
    return isValid
  }

  function reset(): void {
    unlocked.value = {
      1: false,
      2: false,
      3: false,
      4: false,
      5: false
    }
    attempts.value = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    }
    saveToLocalStorage()
  }

  function saveToLocalStorage(): void {
    try {
      const state: ProgressState = {
        unlocked: unlocked.value,
        attempts: attempts.value
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error)
    }
  }

  function loadFromLocalStorage(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const state: ProgressState = JSON.parse(stored)
        unlocked.value = { ...unlocked.value, ...state.unlocked }
        attempts.value = { ...attempts.value, ...state.attempts }
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error)
    }
  }

  // Initialize from localStorage on store creation
  loadFromLocalStorage()

  return {
    // State
    unlocked,
    attempts,
    
    // Computed
    totalSteps,
    unlockedCount,
    progress,
    isStepUnlocked,
    canAccessStep,
    
    // Actions
    validate,
    reset,
    loadFromLocalStorage,
    saveToLocalStorage
  }
})
