<template>
  <div :ref="refBlockName" class="w-100" @mousedown="OnMouseDown" @touchstart="OnTouchStart">
    <div
      class="bar d-flex align-self-center"
      data-direction="horizontal"
      @click="changeValueOnClick"
      @mouseout="MouseLeave"
      @mouseover="MouseEnter"
      @mousewheel="MouseWheel"
    >
      <div class="bar__loaded" :style="{width: loadedValue + '%'}"></div>
      <div class="bar__filled" :style="{width: value + '%'}">
        <div class="pin" data-method="changeValueOnMove"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';

export default {
  name: 'Bar',
  props: {
    refBlockName: String,
    type: String,
    initialValue: 0,
    loaded: Number,
    wheelStep: {
      default: 0.1,
    },
    wheelActive: false,
  },
  data() {
    return {
      value: this.initialValue,
      coefficientValue: this.initialValue / 100,
      currentlyDragged: null,
      loadedValue: this.loaded,
      wheelEnter: false,
      draggableClasses: ['pin'],
    };
  },
  watch: {
    initialValue: function(newValue) {
      if (this.currentlyDragged === null || this.currentlyDragged === false) this.value = this.initialValue;
    },
    loaded: function(newValue) {
      this.loadedValue = this.loaded;
    },
  },
  methods: {
    // updateValue(value) {
    //   this.$refs.filledBar.style.width = value + '%';
    // },
    inRange(event) {
      let rangeBox = this.getRangeBox(event);
      let screenOffset = this.$refs[this.refBlockName].getBoundingClientRect().x;
      let min = screenOffset; /*+ rangeBox.offsetLeft*/
      let max = min + rangeBox.offsetWidth;
      let position;
      let value;

      if (event.touches !== undefined) {
        position = event.touches[0].pageX;
      } else {
        position = event.clientX;
      }
      if (position < min || position > max) {
        if (position < min) value = 0;
        if (position > max) value = 100;

        // this.updateValue(value);
        this.value = value;
        console.log(this.value);
        return false;
      }
      return true;
    },
    getRangeBox(event) {
      let rangeBox = event.target;
      let el = this.currentlyDragged;
      if (event.type === 'click' && this.isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
      }
      if (event.type === 'mousemove' || event.type === 'touchmove') {
        rangeBox = el.parentElement.parentElement;
      }
      return rangeBox;
    },
    isDraggable(el) {
      let canDrag = false;
      let classes = Array.from(el.classList);
      this.draggableClasses.forEach(draggable => {
        if (classes.indexOf(draggable) !== -1) canDrag = true;
      });
      return canDrag;
    },
    getCoefficient(event) {
      let rangeBox = this.getRangeBox(event);
      let screenOffset = this.$refs[this.refBlockName].getBoundingClientRect().x; //document.querySelector("#volume").offsetLeft + 46;
      let K = 0;
      let offsetX;
      if (event.touches !== undefined) {
        offsetX = event.touches[0].pageX - screenOffset;
      } else {
        offsetX = event.clientX - screenOffset;
      }
      let width = rangeBox.clientWidth;
      K = offsetX / width;
      return K;
    },
    changeValueOnMove(event) {
      if (this.inRange(event)) {
        this.coefficientValue = this.getCoefficient(event);
        let valuePercent = this.coefficientValue * 100;
        valuePercent > 100 ? (valuePercent = 100) : '';
        // this.updateValue(value);
        if (this.type === 'time') {
        } else {
          this.$emit('volume-updated', this.coefficientValue);
        }
        this.value = valuePercent;
        this.$emit('bar-drag', true);
      }
    },
    changeValueOnClick() {
      this.changeValueOnMove(event);
      if (this.type === 'time') {
        this.$emit('time-updated', this.coefficientValue);
      }
    },
    changeValue() {
      if (this.type === 'time') {
        this.$emit('time-updated', this.coefficientValue);
      }
      this.$emit('bar-drag', false);
    },
    changeValueOnWheel(isIncreased) {
      if (this.type === 'volume') {
        if (isIncreased) {
          this.coefficientValue + Number(this.wheelStep) > 1
            ? (this.coefficientValue = 1)
            : (this.coefficientValue += Number(this.wheelStep));
        } else {
          this.coefficientValue - Number(this.wheelStep) < 0
            ? (this.coefficientValue = 0)
            : (this.coefficientValue -= Number(this.wheelStep));
        }
        console.log(this.coefficientValue);
        let valuePercent = this.coefficientValue * 100;
        valuePercent > 100 ? (valuePercent = 100) : '';
        this.value = valuePercent;
        console.log(this.value);
        this.$emit('volume-updated', this.coefficientValue);
      }
    },
    OnMouseDown() {
      let vue = this;
      if (!vue.isDraggable(event.target)) return false;

      vue.currentlyDragged = event.target;
      let handleMethod = vue.currentlyDragged.dataset.method;
      console.log(handleMethod);
      window.addEventListener('mousemove', vue[handleMethod], false);

      window.onmouseup = function() {
        if (vue.currentlyDragged !== false && vue.currentlyDragged !== null) vue.changeValue();
        vue.currentlyDragged = false;
        console.log(handleMethod);
        window.removeEventListener('mousemove', vue[handleMethod], false);
      };
    },
    MouseEnter() {
      if (this.wheelActive) {
        this.wheelEnter = true;
      }
    },
    MouseLeave() {
      if (this.wheelActive) {
        this.wheelEnter = false;
      }
    },
    MouseWheel(event) {
      if (this.wheelActive) {
        event.wheelDelta > 0 ? this.changeValueOnWheel(true) : this.changeValueOnWheel(false);
        event.preventDefault ? event.preventDefault() : (event.returnValue = false);
      }
    },
    OnTouchStart() {
      let vue = this;

      if (!vue.isDraggable(event.target)) return false;

      vue.currentlyDragged = event.target;
      let handleMethod = vue.currentlyDragged.dataset.method;

      window.addEventListener('touchmove', vue[handleMethod], false);
      window.ontouchend = function() {
        if (vue.currentlyDragged !== false && vue.currentlyDragged !== null) vue.changeValue();
        vue.currentlyDragged = false;
        window.removeEventListener('touchmove', vue[handleMethod], false);
      };
    },
  },
  created() {
    // let vue = this;
    // this.updateValue(this.value);
    // this.addEventListener("mousedown", function(event) {
    //   if (!vue.isDraggable(event.target)) return false;
    //   vue.currentlyDragged = event.target;
    //   let handleMethod = vue.currentlyDragged.dataset.method;
    //   console.log(handleMethod);
    //   this.addEventListener("mousemove", vue[handleMethod], false);
    //   window.onmouseup = function() {
    //     if (vue.currentlyDragged !== false && vue.currentlyDragged !== null)
    //       vue.changeValue();
    //     vue.currentlyDragged = false;
    //     console.log(handleMethod);
    //     window.removeEventListener("mousemove", vue[handleMethod], false);
    //   };
    // });
    // window.addEventListener("touchstart", function(event) {
    //   if (!vue.isDraggable(event.target)) return false;
    //   vue.currentlyDragged = event.target;
    //   let handleMethod = vue.currentlyDragged.dataset.method;
    //   this.addEventListener("touchmove", vue[handleMethod], false);
    //   window.ontouchend = function() {
    //     if (vue.currentlyDragged !== false && vue.currentlyDragged !== null)
    //       vue.changeValue();
    //     vue.currentlyDragged = false;
    //     window.removeEventListener("touchmove", vue[handleMethod], false);
    //   };
    // });
  },
};
</script>

<style lang="scss" scoped>
.bar {
  height: 4px;

  background-color: gray;
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  width: 100%;
}

.bar__filled {
  background-color: #00bfa5;
  height: 100%;
  pointer-events: none;
  position: absolute;
  width: 0;
}

.bar__loaded {
  background-color: red;
  opacity: 0.6;
  top: 0;
  height: 100%;
  pointer-events: none;
  position: absolute;
  width: 0;
}

.pin {
  width: 10px;
  height: 10px;

  background-color: white;
  border-radius: 8px;
  position: absolute;
  pointer-events: all;
  right: -5px;
  top: -3px;
  -webkit-box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.32);
  -webkit-transition: transform 0.25s ease;
  -webkit-transition: -webkit-transform 0.25s ease;
  transition: -webkit-transform 0.25s ease;
  transition: transform 0.25s ease;
  transition: transform 0.25s ease, -webkit-transform 0.25s ease;

  &:active {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
}
</style>
