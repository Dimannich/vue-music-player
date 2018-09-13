<template>
    <div :ref="refBlockName" class="mt-0">                 
        <div class="bar d-flex align-self-center" data-direction="horizontal" @click="changeValue">
            <div class="bar__filled" :style="{width: value + '%'}">
                <div class="pin" data-method="changeValue"></div>
            </div>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'

let draggableClasses = ["pin"];

export default {
  name: 'Bar',
  props: {
    refBlockName: String,
    type: String,
    initialValue: 0,
  },
  data() {
    return {
      value: this.initialValue
    };
  },
  watch: {
    initialValue: function(newValue) {
      this.value = this.initialValue;
    }
  },
  methods: {
    // updateValue(value) {
    //   this.$refs.filledBar.style.width = value + '%'; 
    // },
    inRange(event) {
      this.getRangeBox(event);
      let rangeBox = this.getRangeBox(event);
      let screenOffset = this.$refs[this.refBlockName].getBoundingClientRect().x;

      let min = screenOffset + rangeBox.offsetLeft;
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
      if (event.type === "click" && this.isDraggable(event.target)) {
        rangeBox = event.target.parentElement.parentElement;
      }
      if (event.type === "mousemove" || event.type === 'touchmove') {
        rangeBox = el.parentElement.parentElement;
      }
      return rangeBox;
    },
    isDraggable(el) {
      let canDrag = false;
      let classes = Array.from(el.classList);
      draggableClasses.forEach(draggable => {
        if (classes.indexOf(draggable) !== -1) canDrag = true;
      });
      return canDrag;
    },
    getCoefficient(event) {
      let rangeBox = this.getRangeBox(event);
      let screenOffset = this.$refs[this.refBlockName].getBoundingClientRect().x;//document.querySelector("#volume").offsetLeft + 46;
      let K = 0;
      let offsetX;
      if(event.touches !== undefined) {
          offsetX = event.touches[0].pageX - screenOffset;
      }
      else {
          offsetX = event.clientX - screenOffset;
      } 
      let width = rangeBox.clientWidth;
      K = offsetX / width;
      return K;
    },
    changeValue(event) {
      if(this.inRange(event)) {
        let value = this.getCoefficient(event) * 100;
        value > 100 ? value = 100 : '';
        // this.updateValue(value);
        this.value = value;
        this.$emit('send', value);
      }
    },
  },
  created() {
       let vue = this;
        //this.updateValue(this.value);
        window.addEventListener('mousedown', function(event) {
        if(!vue.isDraggable(event.target)) 
            return false;

        vue.currentlyDragged = event.target;
        let handleMethod = vue.currentlyDragged.dataset.method;
        this.addEventListener('mousemove', vue[handleMethod], false);

            window.onmouseup = function () {
                vue.currentlyDragged = false;
                window.removeEventListener('mousemove', vue[handleMethod], false);
            }
        });

        window.addEventListener('touchstart', function(event) {
        
        if(!vue.isDraggable(event.target)) 
            return false;

        vue.currentlyDragged = event.target;
        let handleMethod = vue.currentlyDragged.dataset.method;
        
        this.addEventListener('touchmove', vue[handleMethod], false);
            window.ontouchend = function () {
                vue.currentlyDragged = false;
                window.removeEventListener('touchmove', vue[handleMethod], false);
            }
        });
    }
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

