 <template>
      <section class="fixed-bottom player" :class="{noselect: currentlyDragged}">
            <div class="container">
                <div class="row py-0">
                    <audio crossorigin ref="audio" @timeupdate="updateTime" @ended="switchSong($event, true)">
                        <source :src="currentSong.src" type="audio/mpeg">
                    </audio>
                    <div class="my-1 col-1">
                        <img class="rounded cover" :src="currentSong.cover" />
                    </div>
                    <div class="align-self-center col-2 pl-0 song-info text-left">
                        <div class="song-title">{{ currentSong.title }}</div>
                        <div class="song-artist">{{ currentSong.artist }}</div>
                    </div>
                    <div class="col-7 d-flex flex-column" id="player-ui">
                        <div class="align-items-center align-self-center d-flex justify-content-between m-0 mt-auto player-controls">
                            <fa-icon @click="toggleRandom" :class="{'player-controls__btn__repeat--active': random}" class="player-controls__btn player-controls__btn__random" icon="random"></fa-icon>
                            <span @click="switchSong($event, false)" class="player-controls__btn player-controls__nav"><fa-icon icon="step-backward"></fa-icon></span>
                            <span @click="togglePlay" class="player-controls__btn player-controls__btn__play">
                                <fa-icon v-if="!played" icon="play"></fa-icon>
                                <fa-icon v-else icon="pause"></fa-icon>
                            </span>
                            <span @click="switchSong($event, true)" class="player-controls__btn player-controls__nav"><fa-icon icon="step-forward"></fa-icon></span>
                            <fa-icon @click="toggleRepeat" :class="{'player-controls__btn__repeat--active': repeat}" class="player-controls__btn player-controls__btn__repeat" icon="sync-alt"></fa-icon>
                        </div>
                        <div class="mb-auto align-items-center d-flex">
                            <span class="mr-2 song-time">{{ currentTime }}</span>
                            <span class="ml-2 order-last song-time">{{ currentSong.totalTime}}</span>
                            <!-- <div class="align-self-center slider"  @click="changeTime" style="height: 4px;" data-direction="horizontal">
                                <div ref="time" class="progress">
                                    <div class="pin" style="width:10px; height:10px;" id="progress-pin" data-method="rewind"></div>
                                </div>
                            </div> -->
                            <bar refBlockName="timebar" 
                                type="time" 
                                :initial-value="songProgress"
                                :loaded="songLoadedProgress"
                                @time-updated="captureTime" 
                                @bar-drag="setNoSelection"></bar>
                        </div>
                    </div>
                    <div class="col-12 col-md-2 d-flex align-self-center align-items-center">
                        <fa-icon @click="toggleVolume" icon="volume-up" class="mr-2 player-controls__btn"></fa-icon>
                        <bar refBlockName="volumebar" 
                            type="volume" 
                            :initial-value="songVolume"
                            wheel-active="true"
                            wheel-step="0.05"
                            @volume-updated="captureVolume" 
                            @bar-drag="setNoSelection"></bar>
                        <!-- <div ref="volumeBlock" id="volume" class="mt-0">
                           
                            <div ref="line" class="line d-flex align-self-center" @click="changeVolume" style="height: 4px; max-width:126px;" data-direction="horizontal">
                                <div class="volume" ref="volume">
                                    <div class="vol" style="width:10px; height:10px;" id="volume-pin" data-method="changeVolume"></div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                    
                        
                </div>
            </div>
        </section>
 </template>
 
<script>
import Vue from "vue";
import Bar from "./player/Bar.vue";
let player;
// let volume;
// let time;

// let newtime = 0;
// let draggableClasses = ['pin', 'vol'];
//let currentlyDragged = null;
// var currentTime = document.querySelector('#current-time');
// var totalTime = document.querySelector('#total-time');
// var volumebtn = document.querySelector('#vol-btn');

export default {
  components: {
    Bar
  },
  props: {
    initialVolume: {
      type: Number,
      default: 50
    },
    startTime: {
      type: String,
      default: "--:--"
    }
  },

  data() {
    return {
      // {
      //     cover:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
      //     src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3',
      //     title: "Let You Down",
      //     artist: "NF",
      //     totalTime: '3:31'
      // }
      songs: [
        {
          title: "rockstar",
          artist: "Post Malone, 21 Savage",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg",
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3",
          totalTime: "0:00"
        },
        {
          title: "Let You Down",
          artist: "NF",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3",
          totalTime: "0:00"
        },
        {
          title: "Silence",
          artist: "Marshmello, Khalid",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg",
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3",
          totalTime: "0:00"
        },
        {
          title: "I Fall Apart",
          artist: "Post Malone",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg",
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3",
          totalTime: "0:00"
        },
        {
          title: "Fireproof",
          artist: "VAX, Teddy Sky",
          cover:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg",
          src:
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3",
          totalTime: "0:00"
        }
      ],
      currentlyDragged: null,
      played: false,
      currentTime: "--:--",
      songProgress: 0,
      songVolume: this.initialVolume,
      songTempVolume: this.initialVolume,
      songLoadedProgress: 0,
      repeat: false,
      random: false,
      songIndex: 0
    };
  },
  computed: {
    currentSong: function() {
      let song = this.songs[this.songIndex];
      console.log(this.songs.indexOf(song));
      return song;
    }
  },
  methods: {
    toggleRepeat() {
      this.repeat = !this.repeat;
    },
    toggleRandom() {
      this.random = !this.random;
    },
    switchSong(event, isNext) {
      if (this.repeat) {
        if (event.type !== "ended") {
          this.setNextSongRandomIndex();
        }
      } else if (this.random) {
        this.setNextSongRandomIndex();
      } else {
        this.setNextSongIndex(isNext);
      }

      //this.currentTime = 0;
      this.loadSong();
    },
    setNextSongIndex(isNext) {
      if (isNext) {
        this.songIndex < this.songs.length - 1
          ? this.songIndex++
          : (this.songIndex = 0);
      } else {
        this.songIndex > 0
          ? this.songIndex--
          : (this.songIndex = this.songs.length - 1);
      }
    },
    setNextSongRandomIndex() {
      let prevIndex = this.songIndex;
      while (this.songIndex === prevIndex) {
        this.songIndex = Math.floor(Math.random() * this.songs.length - 1) + 1;
      }
    },
    setNoSelection(value) {
      this.currentlyDragged = value;
    },
    captureTime(value) {
      player.currentTime = player.duration * value;
    },
    captureVolume(value) {
      this.songVolume = value * 100;
      player.volume = value;
    },
    togglePlay() {
      player.volume = this.songVolume / 100;
      if (player.paused) {
        this.played = true;
        player.play().catch(() => {
          player.play();
        });
      } else {
        this.played = false;
        player.pause();
      }
    },

    toggleVolume() {
      if (player.volume > 0) {
        player.volume = 0;
        this.songTempVolume = this.songVolume;
        this.songVolume = 0;
      } else {
        player.volume = this.songTempVolume / 100;
        this.songVolume = this.songTempVolume;
      }
    },

    updateVolume() {
      volume.style.width = player.volume * 100 + "%";
    },

    updateTime(event) {
      let current = player.currentTime;
      let percent = (current / player.duration) * 100;
      if (event.target.buffered.length > 0) {
        let loadedProgress =
          (event.target.buffered.end(event.target.buffered.length - 1) /
            player.duration) *
          100;
        if (this.songLoadedProgress !== 100)
          this.songLoadedProgress = loadedProgress;
      }
      // if(this.currentlyDragged === null || this.currentlyDragged === false)
      //     time.style.width = percent + '%';
      this.songProgress = percent;
      this.currentTime = this.formatTime(current);
    },

    // updateTimeOnMove() {
    //     let current = newtime;
    //     let percent = (current / player.duration) * 100;
    //     time.style.width = percent + '%';
    // },

    // inRange(event) {
    //     let rangeBox = this.getRangeBox(event);
    //     let direction = rangeBox.dataset.direction;
    //     let screenOffset = document.querySelector("#player-ui").offsetLeft + 23;
    //     let min = screenOffset + rangeBox.offsetLeft;
    //     let max = min + rangeBox.offsetWidth + 2;
    //     if (event.clientX < min || event.clientX > max) {
    //         return false;
    //     }
    //     return true;
    // },

    // inVolRange (event) {
    //     let rangeBox = this.getRangeBox(event);
    //     let screenOffset = this.$refs.volumeBlock.getBoundingClientRect().x;//this.$refs.volumeBlock.offsetLeft;

    //     let min = screenOffset + rangeBox.offsetLeft;
    //     let max = min + rangeBox.offsetWidth;
    //     // console.log(rangeBox);
    //     // console.log(screenOffset)
    //     // console.log(min, max);
    //     let position;
    //     if( event.touches !== undefined) {
    //         position =  event.touches[0].pageX;
    //     }
    //     else {
    //         position = event.clientX;
    //     }
    //     if (position < min || position > max) {
    //         if(position < min)
    //             player.volume = 0;
    //         if(position > max)
    //             player.volume = 1;

    //         this.updateVolume();
    //         return false;
    //     }
    //     return true;
    // },

    // getRangeBox(event) {
    //     let rangeBox = event.target;
    //     let el = this.currentlyDragged;
    //     if(event.type === 'click' && this.isDraggable(event.target)) {
    //         rangeBox = event.target.parentElement.parentElement;
    //     }
    //     if(event.type === 'mousemove') {
    //         rangeBox = el.parentElement.parentElement;
    //     }
    //     if(event.type === 'touchmove') {
    //          rangeBox = el.parentElement.parentElement;
    //     }
    //     return rangeBox;
    // },

    // isDraggable (el) {
    //     let canDrag = false;
    //     let classes = Array.from(el.classList);
    //         draggableClasses.forEach(draggable => {
    //             if (classes.indexOf(draggable) !== -1)
    //                 canDrag = true;
    //         });
    //     return canDrag;
    // },

    // getCoefficient(event) {
    //     let slider = this.getRangeBox(event);
    //     let screenOffset = document.querySelector("#player-ui").offsetLeft + 58;
    //     let K = 0;
    //     let offsetX = event.clientX - screenOffset;
    //     let width = slider.clientWidth;
    //     K = offsetX / width;
    //     return K;
    // },

    // getVolumeCoefficient(event) {
    //     let rangeBox = this.getRangeBox(event);
    //     let screenOffset = this.$refs.volumeBlock.getBoundingClientRect().x;//document.querySelector("#volume").offsetLeft + 46;
    //     let K = 0;
    //     let offsetX;
    //     if(event.touches !== undefined) {
    //         offsetX = event.touches[0].pageX - screenOffset;
    //     }
    //     else {
    //         offsetX = event.clientX - screenOffset;
    //     }
    //     let width = rangeBox.clientWidth;
    //     console.log(rangeBox);
    //     console.log(screenOffset);
    //     console.log(offsetX);
    //     console.log(width);
    //     //console.log(offsetX);
    //     K = offsetX / width;
    //     return K;
    // },

    // changeTime() {
    //     this.rewind(event);
    //     player.currentTime = newtime;
    // },

    // changeVolume (event) {
    //     if (this.inVolRange(event)) {
    //         let volumeVal = this.getVolumeCoefficient(event);

    //         volumeVal > 1 ? volumeVal = 1 : '';
    //         volumeVal < 0.03 ? volumeVal = 0 : '';

    //         player.volume = volumeVal;
    //         this.updateVolume();
    //     }

    //     //player.volume = 1;
    //     //this.updateVolume();
    // },

    // rewind(event) {
    //     if (this.inRange(event)) {
    //         newtime = player.duration * this.getCoefficient(event);
    //         console.log(newtime);
    //         // if (newtime < 0)
    //         //     newtime = 0;
    //         // if (newtime > player.duration)
    //         //     newtime = player.duration;

    //         //console.log(newtime);
    //         this.updateTimeOnMove();
    //     }
    // },

    loadSong() {
      this.loadedProgress = 0;
      player.load();
      player.currentTime = 0;
      player.play().catch(() => {
        player.play();
      });
    },

    formatTime(time) {
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      return min + ":" + (sec < 10 ? "0" + sec : sec);
    }
  },

  created() {
    let vue = this;

    // window.addEventListener('mousedown', function(event) {

    // if(!vue.isDraggable(event.target))
    //     return false;

    // vue.currentlyDragged = event.target;
    // let handleMethod = vue.currentlyDragged.dataset.method;

    // this.addEventListener('mousemove', vue['rewind'], false);

    //         window.onmouseup = function () {
    //         // if (currentlyDragged !== null && currentlyDragged !== false)
    //         //     if (event.target.param !== null && event.target.param !== 'vol')
    //         //         player.currentTime = newtime;
    //         if(vue.currentlyDragged !== false || vue.currentlyDragged !== null)
    //             vue.changeTime();
    //         vue.currentlyDragged = false;
    //         window.removeEventListener('mousemove', vue[handleMethod], false);
    //     }
    //  });

    // window.addEventListener('touchstart', function(event) {

    // if(!vue.isDraggable(event.target))
    //     return false;

    // vue.currentlyDragged = event.target;
    // let handleMethod = vue.currentlyDragged.dataset.method;

    // this.addEventListener('touchmove', vue[handleMethod], false);

    //     window.ontouchend = function () {
    //         // if (currentlyDragged !== null && currentlyDragged !== false)
    //         //     if (event.target.param !== null && event.target.param !== 'vol')
    //         //         player.currentTime = newtime;
    //         vue.currentlyDragged = false;
    //         window.removeEventListener('touchmove', vue[handleMethod], false);
    //     }
    // });
  },

  mounted() {
    player = this.$refs.audio;
  }
};
</script>

<style lang="scss" scoped>
$main-font-color: white;
$main-select-color: #00bfa5;

.noselect {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
}

// #controls > * {
//     cursor: pointer;
// }

.song-info {
  color: $main-font-color;
}

.cover {
  height: 65px;
  width: 65px;
}

.song-time {
  width: 25px;
  font-size: 12px;
  position: unset;
  color: grey;
}

.player-controls {
  width: 35%;

  &__btn {
    cursor: pointer;
    color: $main-font-color;
    transition: color 0.2s ease;

    &:active {
      transform: scale(0.95);
    }

    &:hover {
      color: $main-select-color;
    }

    &__nav {
      font-size: 16px;
    }

    &__play {
      font-size: 24px;
    }

    &__random,
    &__repeat {
      font-size: 14px;

      &--active {
        color: $main-select-color;
      }
    }
  }
}

.player {
  box-shadow: 0px 8px 10px -4px rgba(0, 0, 0, 0.56), 0 -4px 20px 0 rgba(0, 0, 0, 0.12), 0 -2px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>

