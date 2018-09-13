import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/scss/appstyles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepBackward, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faStepBackward, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause)

Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
