import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faClock, 
  faCamera, 
  faEnvelope, 
  faComments, 
  faMapMarkerAlt,
  faLock,
  faLockOpen,
  faArrowRight,
  faArrowLeft,
  faCheck,
  faSearchPlus,
  faDownload,
  faTimes,
  faGift,
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(faClock, faCamera, faEnvelope, faComments, faMapMarkerAlt, faLock, faLockOpen, faArrowRight, faArrowLeft, faCheck, faSearchPlus, faDownload, faTimes, faGift, faChevronLeft, faChevronRight)

// Global styles
import '@/styles/tokens.css'
import '@/styles/globals.scss'

const app = createApp(App)
const pinia = createPinia()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(pinia)
app.use(router)

app.mount('#app')
