<template>
  <li>
    <div
      class="user pb-0 d-flex align-items-center sidebar-song"
      @mouseover="updateState(true)"
      @mouseout="updateState(false)"
      @click="setActive()"
    >
      <div class="cover-wrap d-flex justify-content-center align-items-center position-relative">
        <img class="cover" :src="song.cover" alt="cover">
        <fa-icon
          class="song__play-icon"
          :class="{'song__pause-icon--active': !active && hover && !disableMouseOver}"
          :icon="['far', 'play-circle']"
        ></fa-icon>
        <fa-icon
          class="song__pause-icon"
          :class="{'song__pause-icon--active': active && hover && !disableMouseOver}"
          :icon="['far', 'pause-circle']"
        ></fa-icon>
        <div class="song__playing" :class="{'song__playing--active': active && !hover}"></div>
      </div>
      <div class="user-info">
        <span class="sidebar-song__name">SongName</span>
        <br>
        <router-link :to="playlistLink" class="playlist sidebar-song__playlist m-0 p-0">playlist</router-link>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'sidebar-song',
  props: {
    song: {
      type: Object,
      default: () => {
        return {};
      },
    },
    color: {
      type: String,
      default: 'white',
    },
    activeColor: {
      type: String,
      default: '#00bfa5',
    },
    playlistLink: {
      type: String,
      default: '/fetch-data',
    },
    active: {
      type: Boolean,
      default: true,
    },
    disableMouseOver: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    baseComponent() {},
    isMenu() {},
    isActive() {},
  },
  methods: {
    updateState(isHover) {
      this.hover = isHover;
    },
    setActive() {
      this.$store.dispatch('setActive');
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-song {
  &__playlist {
    font-size: 13px;
    opacity: 0.6;
  }
}

.cover-wrap {
  width: 34px;
  height: 34px;
  min-width: 34px;
  margin-left: 23px;
}

.cover {
  border-radius: 5px;
  box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0 rgba(0, 0, 0, 0.12),
    0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.playlist {
  &:hover {
    text-decoration: underline;
  }
}

$main-font-color: white;
$main-select-color: #00bfa5;

.song {
  color: $main-font-color;
  cursor: pointer;

  &:hover {
    img {
      opacity: 0.6;
    }
  }

  &__artist {
    font-size: 12px;
    opacity: 0.6;
  }

  &__name {
    &--active {
      color: $main-select-color;
    }
  }

  &__add,
  &__fav {
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      color: $main-select-color;
    }
  }

  &__img {
    position: relative;
    width: 50px;
    height: 50px;
  }

  &__playing {
    background: url(../assets/img/Facebook.svg) no-repeat;
    background-size: 30px;
    width: 30px;
    height: 30px;
    position: absolute;
    transition: visibility 0s, opacity 0.2s linear;
    visibility: hidden;
    opacity: 0;

    &--active {
      // display: block;
      visibility: visible;
      opacity: 1;
    }
  }

  &__play-icon,
  &__pause-icon {
    position: absolute;
    font-size: 30px;
    visibility: hidden;
    color: white;
    &--active {
      visibility: visible;
    }
  }

  &--active {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &--moved {
    cursor: grabbing;
  }
}
</style>
