import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/scss/appstyles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepBackward, faPlus, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause, faGripVertical, faHeart } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'

library.add(faStepBackward, faPlayCircle, faPauseCircle, faHeart, faPlus, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause, faGripVertical)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
