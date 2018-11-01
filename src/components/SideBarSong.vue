<template>
    <li>
        <div>
          <div class="user align-items-center sidebar-song">
            <div class="photo mt-2 sidebar-song__cover">
                <img :src="song.cover" alt="cover">
            </div>
            <div class="user-info">
                <span class="sidebar-song__name">
                    SongName
                </span>
                <br>
                <span class="sidebar-song__playlist">
                    playlist
                </span>
            </div>
          </div>
        </div>
    </li>
</template>
<script>
export default {
  name: "sidebar-song",
  props: {
    song: {
      type: Object,
      default: () => {
        return { };
      }
    },
    color: {
      type: String,
      default: "white"
    },
    activeColor: {
      type: String,
      default: "#00bfa5"
    }
  },
  data() {
    return {
      hover: false
    };
  },
  computed: {
    baseComponent() {},
    isMenu() {},
    isActive() {}
  },
  methods: {}
};
</script>
<style lang="scss">
  .sidebar-song {
    &__playlist {
      font-size: 13px;
      opacity: .6;
    }
  }

  // .user-info {
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  // }
</style>
