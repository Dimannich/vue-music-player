import Sidebar from './SideBar.vue'
import SidebarItem from './SideBarItem.vue'
import SidebarSong from './SideBarSong.vue'

const SidebarStore = {
  showSidebar: false,
  sidebarLinks: [],
  isMinimized: false,
  displaySidebar (value) {
    this.showSidebar = value
  },
  toggleMinimize () {
    document.body.classList.toggle('sidebar-mini');
    // const simulateWindowResize = setInterval(() => {
    //   window.dispatchEvent(new Event('resize'))
    // }, 180);

    // setTimeout(() => {
    //   clearInterval(simulateWindowResize)
    // }, 1000);

    this.isMinimized = !this.isMinimized
  }
};

const SidebarPlugin = {

  install (Vue, options) {
    if (options && options.sidebarLinks) {
      SidebarStore.sidebarLinks = options.sidebarLinks
    }
    Vue.mixin({
      data () {
        return {
          sidebarStore: SidebarStore
        }
      }
    });

    Object.defineProperty(Vue.prototype, '$sidebar', {
      get () {
        return this.$root.sidebarStore
      }
    });
    Vue.component('side-bar', Sidebar);
    Vue.component('sidebar-item', SidebarItem);
    Vue.component('sidebar-song', SidebarSong);
  }
};

export default SidebarPlugin
