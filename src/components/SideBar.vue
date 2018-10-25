<template>
  <div class="sidebar" :style="{ background: backgroundColor}">
    <div class="logo">
      <a href="#" class="simple-text logo-mini" target="_blank">
        <div class="logo-img">
          <img :src="logo">
        </div>
      </a>
      <a href="#" class="simple-text logo-normal text-left" target="_blank">
        {{title}}
      </a>
      <div class="navbar-minimize">
        <md-button class="md-round md-just-icon md-transparent" @click="minimizeSidebar">
          <i class="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
          <i class="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
        </md-button>
      </div>
    </div>
    <div class="sidebar-wrapper d-flex flex-column">
      <ul class="pl-0">
        <slot name="general">
          <sidebar-item v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link">
          </sidebar-item>
        </slot>
      </ul>
      <ul>
        <slot name="songs">

        </slot>
      </ul>
      <ul class="mt-auto pl-0">
        <slot name="profile">
          <sidebar-item v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link">
          </sidebar-item>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import logo from '@/assets/img/test-logo.png'

export default {
  name: "sidebar",
  props: {
    title: {
      type: String,
      default: "Impuls"
    },
    activeColor: {
      type: String,
      default: "white"
    },
    backgroundColor: {
      type: String,
      default: "#393f54"
    },
    logo: {
      type: String,
      default: logo
    },
    sidebarLinks: {
      type: Array,
      default: () => [
        {
          path: "/fetch-data",
          name: "test",
          icon: "assignment",
        },
        {
          path: '/',
          name: 'News',
          icon: 'replay'
        }
      ]
    }
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>
<style lang="scss">
@media (min-width: 992px) {
  .navbar-search-form-mobile,
  .nav-mobile-menu {
    display: none;
  }
  .sidebar {
    &:after {
      content: unset;
    }
    z-index: 1020;

    .sidebar-wrapper {
      height: calc(100vh - 130px);
    }
  }

  .sidebar-mini .sidebar {
    z-index: 1020;
  }
}
</style>
