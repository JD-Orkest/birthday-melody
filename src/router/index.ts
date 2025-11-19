import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useProgressStore } from '@/store/useProgress'
import Home from '@/pages/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Accueil - Anniversaire Melo'
    }
  },
  {
    path: '/etape/1',
    name: 'Step1',
    component: () => import('@/pages/Step1.vue'),
    meta: {
      title: 'Étape 1 : Notre temps - Anniversaire Melo',
      requiresAccess: 1
    }
  },
  {
    path: '/etape/2',
    name: 'Step2',
    component: () => import('@/pages/Step2.vue'),
    meta: {
      title: 'Étape 2 : Les visages - Anniversaire Melo',
      requiresAccess: 2
    }
  },
  {
    path: '/etape/3',
    name: 'Step3',
    component: () => import('@/pages/Step3.vue'),
    meta: {
      title: 'Étape 3 : Le mot doux - Anniversaire Melo',
      requiresAccess: 3
    }
  },
  {
    path: '/etape/4',
    name: 'Step4',
    component: () => import('@/pages/Step4.vue'),
    meta: {
      title: 'Étape 4 : Nos mots à deux doigts - Anniversaire Melo',
      requiresAccess: 4
    }
  },
  {
    path: '/etape/5',
    name: 'Step5',
    component: () => import('@/pages/Step5.vue'),
    meta: {
      title: 'Étape 5 : L\'adresse - Anniversaire Melo',
      requiresAccess: 5
    }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

// Navigation guards
router.beforeEach((to, _from, next) => {
  // Update page title
  if (to.meta.title) {
    document.title = to.meta.title as string
  }

  // Check access to steps
  if (to.meta.requiresAccess) {
    const step = to.meta.requiresAccess as number
    const progressStore = useProgressStore()

    // Step 1 is always accessible
    if (step === 1) {
      next()
      return
    }

    // Other steps require previous step to be unlocked
    const canAccess = progressStore.canAccessStep(step)
    
    if (!canAccess) {
      console.warn(`Access denied to step ${step}. Previous step must be unlocked first.`)
      // Allow navigation but the page will show the locked state
      next()
      return
    }
  }

  next()
})

export default router
