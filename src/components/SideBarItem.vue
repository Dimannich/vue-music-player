<template>
  <component
    :is="baseComponent"
    :to="link.path ? link.path : '/'"
    :class="{active : isActive}"
    tag="li"
  >
    <slot v-if="link.path">
      <component
        :to="link.path"
        @click.native="linkClick"
        :is="elementType(link, false)"
        :class="{active: link.active}"
        class="nav-link"
        :target="link.target"
        :href="link.path"
        :style="{color: hover || isActive ? activeColor : color}"
        @mouseover.native="isHover(true)"
        @mouseout.native="isHover(false)"
      >
        <fa-icon class="link-icon" :icon="link.icon"></fa-icon>
        <p>{{link.name}}</p>
      </component>
    </slot>
  </component>
</template>
<script>
export default {
  name: 'sidebar-item',
  props: {
    menu: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Object,
      default: () => {
        return {
          name: '',
          path: '',
          children: [],
        };
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
  },
  data() {
    return {
      hover: false,
    };
  },
  computed: {
    baseComponent() {
      return this.isMenu || this.link.isRoute ? 'li' : 'router-link';
    },
    isMenu() {
      return false;
    },
    isActive() {
      if (this.$route && this.$route.path) {
        if (this.link.path === this.$route.path) {
          return true;
        }
      }
      return false;
    },
  },
  methods: {
    elementType(link, isParent = true) {
      if (link.isRoute === false) {
        return isParent ? 'li' : 'a';
      } else {
        return 'router-link';
      }
    },
    linkClick() {
      if (this.autoClose && this.$sidebar && this.$sidebar.showSidebar === true) {
        this.$sidebar.displaySidebar(false);
      }
    },
    isHover(isHover) {
      this.hover = isHover;
      console.log(this.hover);
    },
  },
  destroyed() {
    if (this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
};
</script>
<style>
.nav-link {
  cursor: pointer;
}

.link-icon {
  height: 20px;
  margin-right: 15px !important;
  text-align: center;
  font-size: 20px;
  margin-left: 6px;
}

.off-canvas-sidebar .nav li a,
.sidebar .nav li a {
  display: flex;
  align-items: center;
}
</style>
