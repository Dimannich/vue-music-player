<template>
  <grid
    :center="false"
    :draggable="true"
    :sortable="true"
    :items="items"
    :cellHeight="180"
    :cellWidth="180"
    @change="change"
    @remove="remove"
    @click="click"
    @sort="sort"
  >
    <template slot="cell" scope="props">
      <Icon :color="props.item" :index="props.index" :with-button="true" @remove="props.remove()"/>
    </template>
  </grid>
</template>

<script>
import Icon from '../components/Icon.vue';
import Grid from '../components/Grid.vue';

export default {
  name: 'Albums',
  components: {
    Icon,
    Grid,
  },
  data: () => {
    return {
      items: [
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
        { r: 57, g: 63, b: 84 },
      ],
    };
  },
  methods: {
    click({ items, index }) {
      let value = items.find(v => v.index === index);
      this.selected = value.item;
      console.log(this.selected);
    },
    change(event) {
      console.log('change', event);
    },
    remove(event) {
      console.log('remove', event);
    },
    sort(event) {
      console.log('sort', event);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
