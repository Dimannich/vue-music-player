<template>
  <div class="sidebar" :style="{ background: backgroundColor}">
    <div class="logo">
      <a href="#" class="simple-text logo-mini" target="_blank">
        <div class="logo-img">
          <img :src="logo" alt="logo">
        </div>
      </a>
      <a href="#" class="simple-text logo-normal text-left" target="_blank">
        {{title}}
      </a>
      <div class="navbar-minimize">
        <button class="md-button md-round md-just-icon md-transparent md-theme-default" @click="minimizeSidebar">
          <div class="md-ripple">
            <div class="md-button-content">
              <fa-icon icon="ellipsis-v" class="visible-on-sidebar-regular"></fa-icon>
              <fa-icon icon="th-list" class="visible-on-sidebar-mini"></fa-icon>
            </div>
          </div>
        </button>
      </div>
    </div>
    <div class="sidebar-wrapper text-left">
      <ul class="pl-0 md-list nav">
        <slot name="general">
          <sidebar-item v-for="(link, index) in sidebarLinks"
                        :key="link.name + index"
                        :link="link">
          </sidebar-item>
        </slot>
        <slot name="songs">
          <sidebar-song v-for="(song, index) in recentlyPlayed"
                        :key="song.name + index"
                        :song="song">
          </sidebar-song>
        </slot>
        <slot name="profile">
          <div class="delimetr"></div>
          <div class="user">
            <div class="photo">
              <img :src="logo" alt="avatar">
            </div>
            <div class="user-info">
                profile
            </div>
          </div>
          <sidebar-item v-for="(link, index) in profileLinks"
                        :key="link.name + index"
                        :link="link">
          </sidebar-item>
        </slot>
      </ul>
    </div>
  </div>
</template>
<script>
import logo from "@/assets/img/test-logo.png";

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
          name: "Поиск",
          icon: "search"
        },
        {
          path: "/",
          name: "My music",
          icon: "th"
        },
        {
          path: "/123",
          name: "News",
          icon: "fire"
        }
      ]
    },
    profileLinks: {
      type: Array,
      default: () => [
        {
          path: "/settings",
          name: "Настройки",
          icon: "cog"
        },
        {
          path: "/logout",
          name: "Выйти",
          icon: "sign-out-alt"
        }
      ]
    },
    recentlyPlayed: {
      type: Array,
      default: () => [
        {
          name: "",
          playlist: "",
          cover: logo
        },
        {
          name: "",
          playlist: "",
          cover: logo
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

  .delimetr {
    display: block;
    margin: 0;
    padding-bottom: 1rem;
    position: relative;
    z-index: 4;
    &::before {
      background-color: rgba(180, 180, 180, 0.3);
      top: 0;
      content: "";
      height: 1px;
      position: absolute;
      right: 15px;
      width: calc(100% - 30px);
    }
  }

  .sidebar-mini .sidebar .user .user-info {
    -webkit-transform: translate3d(-25px, 0, 0);
    opacity: 0;
    transform: translate3d(-25px, 0, 0);
  }

  .sidebar-mini .sidebar:hover .user .user-info {
    -webkit-transform: translateZ(0);
    opacity: 1;
    transform: translateZ(0);
  }

  .sidebar-mini .sidebar-wrapper {
    overflow-x: hidden;
  }

  .sidebar .user {
    margin: 0;
    padding-bottom: 10px;

    &::after {
      content: unset;
    }
  }

  .sidebar .user .user-info {
    display: block;
    opacity: 1;
    position: relative;
    color: white;
    white-space: nowrap;
    padding: 0.5rem 15px;
    transition: all 0.3s linear;
  }

  .md-button,
  .md-button-clean {
    margin: 0;
    padding: 0;
    display: inline-block;
    position: relative;
    overflow: hidden;
    outline: none;
    background: transparent;
    border: 0;
    border-radius: 0;
    transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    font-family: inherit;
    line-height: normal;
    text-decoration: none;
    vertical-align: top;
    white-space: nowrap;
  }

  .md-button {
    min-width: 88px;
    height: 36px;
    margin: 6px 8px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border-radius: 2px;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    -webkit-box-shadow: none;
    background-color: transparent !important;
    box-shadow: none;
    border-radius: 30px;
    font-size: 24px;
    height: 41px;
    line-height: 41px;
    min-width: 41px;
    overflow: hidden;
    padding: 0;
    position: relative;
    width: 41px;
  }

  .md-ripple {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 5;
    overflow: hidden;
    -webkit-mask-image: radial-gradient(circle, #fff 100%, #000 0);
  }

  .md-button .md-ripple {
    padding: 0 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .md-button-content {
    position: relative;
    z-index: 2;
  }

  .md-button .md-button-content {
    -ms-flex-align: center;
    -webkit-box-align: center;
    align-items: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }
}
</style>
