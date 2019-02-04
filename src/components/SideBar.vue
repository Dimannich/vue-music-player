<template>
  <div class="sidebar" :style="{ background: backgroundColor}">
    <div class="logo pb-0">
      <a href="#" class="simple-text logo-mini" target="_blank">
        <div class="logo-img">
          <img :src="logo" alt="logo">
        </div>
      </a>
      <a href="#" class="simple-text logo-normal text-left" target="_blank">{{title}}</a>
      <div class="navbar-minimize">
        <button
          class="md-button md-round md-just-icon md-transparent md-theme-default text-white"
          @click="minimizeSidebar"
        >
          <div class="md-ripple">
            <div class="md-button-content">
              <fa-icon icon="ellipsis-v" class="visible-on-sidebar-regular"></fa-icon>
              <fa-icon icon="th-list" class="visible-on-sidebar-mini"></fa-icon>
            </div>
          </div>
        </button>
      </div>
    </div>
    <hr class="delimetr">
    <div class="sidebar-wrapper text-left">
      <ul class="pl-0 md-list nav mt-0 h-100">
        <li>
          <slot name="general">
            <ul class="pl-0">
              <sidebar-item
                v-for="(link, index) in sidebarLinks"
                :key="link.name + index"
                :link="link"
              ></sidebar-item>
            </ul>
          </slot>
        </li>
        <li>
          <hr class="delimetr">
        </li>
        <li class="recent-songs">
          <slot name="songs">
            <ul class="pl-0 d-flex flex-column" style="overflow-y: auto; overflow-x: hidden">
              <sidebar-song
                v-for="(song, index) in recentlyPlayed"
                :key="song.title + index"
                :song="song"
              ></sidebar-song>
            </ul>
          </slot>
        </li>
        <li>
          <hr class="delimetr">
        </li>
        <li>
          <slot name="profile">
            <ul class="pl-0 profile-nav">
              <li>
                <div class="user">
                  <div class="photo">
                    <img src="../assets/img/music65.png" alt="avatar">
                  </div>
                  <div class="user-info">user name</div>
                </div>
              </li>
              <sidebar-item
                v-for="(link, index) in profileLinks"
                :key="link.name + index"
                :link="link"
              ></sidebar-item>
            </ul>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/test-logo.png';

export default {
  name: 'sidebar',
  props: {
    title: {
      type: String,
      default: 'Impuls',
    },
    activeColor: {
      type: String,
      default: 'white',
    },
    backgroundColor: {
      type: String,
      default: '#393f54',
    },
    logo: {
      type: String,
      default: logo,
    },
    sidebarLinks: {
      type: Array,
      default: () => [
        {
          path: '/fetch-data',
          name: 'Search',
          icon: 'search',
        },
        {
          path: '/',
          name: 'My music',
          icon: 'th',
        },
        {
          path: '/albums',
          name: 'News',
          icon: 'fire',
        },
      ],
    },
    profileLinks: {
      type: Array,
      default: () => [
        {
          path: '/settings',
          name: 'Settings',
          icon: 'cog',
        },
        {
          path: '/logout',
          name: 'Log out',
          icon: 'sign-out-alt',
        },
      ],
    },
  },
  computed: {
    recentlyPlayed() {
      return this.$store.state.recentlyPlayedSongs;
    },
  },
  methods: {
    minimizeSidebar() {
      if (this.$sidebar) {
        this.$sidebar.toggleMinimize();
      }
    },
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  },
};
</script>

<style lang="scss">
.logo {
  &:after {
    content: unset !important;
  }
}

.recent-songs {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 100%;
  overflow: hidden;
}

@media (min-width: 992px) {
  .profile-nav {
    max-height: 210px;
    margin-top: auto;
  }

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
      height: calc(100vh - 175px);
      overflow: unset;
    }
  }

  .sidebar-mini .sidebar {
    z-index: 1020;
  }

  .delimetr {
    width: calc(100% - 30px);
    border-color: rgba(180, 180, 180, 0.3);
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
    // overflow-x: hidden;
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
