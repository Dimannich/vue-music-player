<template>
    <div class="root">
      <slick-list @mouseout="handleOut" helperClass="draggable-item--moved" :useDragHandle="true" v-model="items" class="mt-5" lockAxis="y" @input="handleMove(false)" @sort-start="handleMove(true)">
        <slick-item v-for="(item, index) in items" :index="index" :key="index">
          <div class="draggable-item d-flex">
            <div :class="{'draggable-item__handle--hover': !disableMouseOver}" @mouseover="handleOver" v-handle class="draggable-item__handle h-100 d-flex justify-content-center align-items-center">
                <fa-icon icon="grip-vertical"></fa-icon>
            </div>
            <play-list-item :disableMouseOver="disableMouseOver" :song="item" :active="item.id === 1 ? true : false"></play-list-item>
          </div>
        </slick-item>
      </slick-list>
    </div>
</template>

<script>
import { SlickItem, SlickList, HandleDirective } from "vue-slicksort";
import PlayListItem from "./playlist/PlayListItem.vue";

export default {
  name: "PlayList",
  components: {
    SlickItem,
    SlickList,
    PlayListItem
  },
  directives: {
    handle: HandleDirective
  },
  data: function() {
    return {
      items: [
        {
          id: 1,
          data: 1
        },
        {
          id: 2,
          data: 2
        },
        {
          id: 3,
          data: 3
        },
        {
          id: 4,
          data: 4
        }
      ],
      moved: false,
      hover: true,
      disableMouseOver: false
    };
  },
  methods: {
    handleMove(isMoved) {
      console.log(isMoved);
      this.moved = isMoved;
      this.disableMouseOver = isMoved;
      if (isMoved) document.documentElement.style.cursor = "grabbing";
      else document.documentElement.style.cursor = "unset";
    },

    handleOver() {
      if (!this.moved) {
        document.documentElement.style.cursor = "grab";
      }
    },
    handleOut() {
      if (!this.moved) document.documentElement.style.cursor = "unset";
    }
  }
};
</script>


<style lang="scss" scoped>
$main-font-color: white;
$main-select-color: #00bfa5;

.draggable-item {
  height: 50px;
  background: transparent;
  // #TODO remove
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__handle {
    font-size: 20px;
    width: 40px;
    color: $main-font-color;
    transition: color 0.15s ease;

    &--hover {
      &:hover {
        color: $main-select-color;
      }
    }
  }
}
.stylizedHelper {
  background: black;
}

.draggable-item--moved {
  & .draggable-item__handle {
    color: $main-select-color;
  }
}
</style>
