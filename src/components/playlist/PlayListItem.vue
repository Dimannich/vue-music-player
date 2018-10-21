<template>
    <div :class="{'song--moved': disableMouseOver}" class="d-flex align-items-center song flex-fill" @mouseover="updateState(true)" @mouseout="updateState(false)">
        <div class="d-flex justify-content-center align-items-center song__img">
            <img class="img-fluid" src="../../assets/img/music65.png" />
            <fa-icon class="song__play-icon" :class="{'song__pause-icon--active': !active && hover && !disableMouseOver}" :icon="['far', 'play-circle']"></fa-icon>
            <fa-icon class="song__pause-icon" :class="{'song__pause-icon--active': active && hover && !disableMouseOver}" :icon="['far', 'pause-circle']"></fa-icon>
            <div class="song__playing" :class="{'song__playing--active': active && !hover}"></div>
        </div>
        <div class="col align-items-start d-flex flex-column">
            <span class="song__name" :class="{'song__name--active': active}">Song name {{ song.id }}</span>
            <span class="song__artist">Song artist</span>
        </div>
        <div class="song__controls">
            <span class="song__add">
                <fa-icon icon="plus"></fa-icon>
            </span>
            <span class="song__fav">
                <fa-icon icon="heart"></fa-icon>
            </span>             
        </div>
        <span class="mr-3 song__time">time</span>       
    </div>
</template>

<script>
export default {
  name: "PlayListItem",
  props: {
    active: false,
    song: Object,
    disableMouseOver: Boolean
  },

  data() {
    return {
      hover: false
    };
  },
  
  computed: {

  },

  methods: {
    updateState(isHover) {
      this.hover = isHover;
    }
  }
};
</script>

<style lang="scss" scoped>
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
    transition: all .2s ease;
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
    background: url(../../assets/img/Facebook.svg) no-repeat;
    background-size: 50px;
    width: 50px;
    height: 50px;
    position: absolute;
    transition: visibility 0s, opacity .2s linear;
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
