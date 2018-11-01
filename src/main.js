import '@babel/polyfill'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './assets/scss/appstyles.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faStepBackward, faPlus, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause, faGripVertical, faHeart, faFire, faTable, faSearch, faTh, faCog, faSignOutAlt, faEllipsisV, faThList } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'
import SideBar from './components/sidebar-plugin'
import 'vue-material/dist/vue-material.min.css'

library.add(faThList, faEllipsisV, faSignOutAlt, faCog, faFire, faTh, faSearch, faStepBackward, faPlayCircle, faPauseCircle, faHeart, faPlus, faPlay, faStepForward, faVolumeUp, faVolumeDown, faVolumeOff, faSyncAlt, faRandom, faPause, faGripVertical)

Vue.component('fa-icon', FontAwesomeIcon)
Vue.use(SideBar)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
