 <template>
      <section class="fixed-bottom player" :class="{noselect: currentlyDragged}">
            <div class="container">
                <div id="player" class="row py-0">
                    <audio crossorigin ref="audio" @timeupdate="updateTime">
                        <source :src="currentSong.src" type="audio/mpeg">
                    </audio>
                    <div class="my-1 col-1">
                        <img class="rounded cover" :src="currentSong.cover" style="height:65px;" />
                    </div>
                    <div class="align-self-center col-2 pl-0 song-info">
                        <div class="song-title">{{ currentSong.title }}</div>
                        <div class="song-artist">{{ currentSong.artist }}</div>
                    </div>
                    <div class="col-7 d-flex flex-column" id="player-ui">
                        <div id="controls" style="width:35%;" class="align-items-center align-self-center d-flex justify-content-between m-0 mt-auto">
                            <fa-icon id="random" style="font-size: 14px;" icon="random"></fa-icon>
                            <span style="font-size:16px;" id="prev-btn"><fa-icon icon="step-backward"></fa-icon></span>
                            <span @click="togglePlay" style="font-size:24px;" id="play-btn">
                                <fa-icon v-if="!played" icon="play"></fa-icon>
                                <fa-icon v-else icon="pause"></fa-icon>
                            </span>
                            <span style="font-size:16px;" id="next-btn"><fa-icon icon="step-forward"></fa-icon></span>
                            <fa-icon id="repeat" icon="sync-alt" style="font-size: 14px;"></fa-icon>
                        </div>
                        <div id="timeline" style="margin-top:0; width:95%;" class="mb-auto align-items-center d-flex">
                            <span id="current-time" style="width: 25px;font-size: 12px;position:unset;" class="mr-2">{{ currentTime }}</span>
                            <span id="total-time" class="ml-2 order-last" style="font-size: 12px;width: 25px; position:unset;">{{ currentSong.totalTime}}</span>
                            <div class="align-self-center slider" @click="changeTime" style="height: 4px;" data-direction="horizontal">
                                <div ref="time" class="progress">
                                    <div class="pin" style="width:10px; height:10px;" id="progress-pin" data-method="rewind"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-md-2 d-flex align-self-center">
                        <fa-icon id="vol-btn" icon="volume-up" class="mr-auto" style="color: white"></fa-icon>
                        <div ref="volumeBlock" id="volume" class="mt-0">
                           
                            <div ref="line" class="line d-flex align-self-center" @click="changeVolume" style="height: 4px; max-width:126px;" data-direction="horizontal">
                                <div class="volume" ref="volume">
                                    <div class="vol" style="width:10px; height:10px;" id="volume-pin" data-method="changeVolume"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 mb-3">
                        <bar refBlockName="volumeBar" type="volume" :initial-value="songProgress" @send="captureValue"></bar>
                    </div>
                </div>
            </div>
        </section>
 </template>
 
<script>

import Vue from 'vue'
import Bar from './player/Bar.vue'
let player;
let volume;
let time;

let newtime = 0;
let draggableClasses = ['pin', 'vol'];
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
            default: 0.5
        },
        startTime: {
            type: String,
            default: '--:--'
        }
    },
    
    data() {
        return {
            currentSong: {
                cover:"https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png",
                src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3',
                title: "Let You Down",
                artist: "NF",
                totalTime: '3:31'
            },
            songs: {

            },
            currentlyDragged: null,
            played: false,
            currentTime: '--:--',
            songProgress: 2,
            songVolume: this.initialVolume,
        };
    },
    methods: {
        captureValue(text) {
            console.log(text);
            this.$emit('send', text);
        },
        togglePlay () {
            player.volume = this.songVolume;
            this.updateVolume();
            if(player.paused) {
                this.played = true;
                player.play().catch(() => { player.play();});
            }
            else {
                this.played = false;
                player.pause();
            }
        },

        toggleVolume () {
            if(player.volume > 0){
                player.volume = 0;
            }
            else {
                player.volume = this.songVolume;
            }

            this.updateVolume();
        },

        updateVolume () {
            volume.style.width = player.volume * 100 + '%';
        },

        updateTime() {
            let current = player.currentTime;
            let percent = (current/player.duration) * 100;

            if(this.currentlyDragged === null || this.currentlyDragged === false)
                time.style.width = percent + '%';
            this.songProgress = percent;
            // console.log(this.songProgress);
            this.currentTime = this.formatTime(current);
        },

        updateTimeOnMove() {
            let current = newtime;
            let percent = (current / player.duration) * 100;
            time.style.width = percent + '%';
        },

        inRange(event) {
            let rangeBox = this.getRangeBox(event);
            let direction = rangeBox.dataset.direction;
            let screenOffset = document.querySelector("#player-ui").offsetLeft + 23;
            let min = screenOffset + rangeBox.offsetLeft;
            let max = min + rangeBox.offsetWidth + 2;   
            if (event.clientX < min || event.clientX > max) { 
                return false; 
            }
            return true;
        },

        inVolRange (event) {
            let rangeBox = this.getRangeBox(event);
            let screenOffset = this.$refs.volumeBlock.getBoundingClientRect().x;//this.$refs.volumeBlock.offsetLeft;
            
            let min = screenOffset + rangeBox.offsetLeft;
            let max = min + rangeBox.offsetWidth;
            // console.log(rangeBox);
            // console.log(screenOffset)
            // console.log(min, max);
            let position;
            if( event.touches !== undefined) {
                position =  event.touches[0].pageX;
            } 
            else {
                position = event.clientX;
            }
            if (position < min || position > max) { 
                if(position < min)
                    player.volume = 0;
                if(position > max)
                    player.volume = 1;

                this.updateVolume();
                return false; 
            }
            return true;
        },

        getRangeBox(event) {
            let rangeBox = event.target;
            let el = this.currentlyDragged;
            if(event.type === 'click' && this.isDraggable(event.target)) {
                rangeBox = event.target.parentElement.parentElement;
            }
            if(event.type === 'mousemove') {
                rangeBox = el.parentElement.parentElement;
            }
            if(event.type === 'touchmove') {
                 rangeBox = el.parentElement.parentElement;
            }
            return rangeBox;
        },

        isDraggable (el) {
            let canDrag = false;
            let classes = Array.from(el.classList);
                draggableClasses.forEach(draggable => {
                    if (classes.indexOf(draggable) !== -1)
                        canDrag = true;
                });
            return canDrag;
        },

        getCoefficient(event) {
            let slider = this.getRangeBox(event);
            let screenOffset = document.querySelector("#player-ui").offsetLeft + 58;
            let K = 0;
            let offsetX = event.clientX - screenOffset;
            let width = slider.clientWidth;
            K = offsetX / width;
            return K;
        },

        getVolumeCoefficient(event) {
            let rangeBox = this.getRangeBox(event);
            let screenOffset = this.$refs.volumeBlock.getBoundingClientRect().x;//document.querySelector("#volume").offsetLeft + 46;
            let K = 0;
            let offsetX;
            if(event.touches !== undefined) {
                offsetX = event.touches[0].pageX - screenOffset;
            }
            else {
                offsetX = event.clientX - screenOffset;
            } 
            let width = rangeBox.clientWidth;
            console.log(rangeBox);
            console.log(screenOffset);
            console.log(offsetX);
            console.log(width);
            //console.log(offsetX);
            K = offsetX / width;
            return K;
        },

        changeTime() {
            this.rewind(event);
            player.currentTime = newtime;
        },

        changeVolume (event) {
            if (this.inVolRange(event)) {
                let volumeVal = this.getVolumeCoefficient(event);

                volumeVal > 1 ? volumeVal = 1 : '';
                volumeVal < 0.03 ? volumeVal = 0 : '';

                player.volume = volumeVal;
                this.updateVolume();
            }

            //player.volume = 1;
            //this.updateVolume();
        },

        rewind(event) {
            if (this.inRange(event)) {
                newtime = player.duration * this.getCoefficient(event);
                console.log(newtime);
                // if (newtime < 0)
                //     newtime = 0;
                // if (newtime > player.duration)
                //     newtime = player.duration;

                //console.log(newtime);
                this.updateTimeOnMove();
            }
        },

        loadSong() {
            player.load();
            player.currentTime = 0;
            player.play().catch(() => { player.play();});
        },

        formatTime(time) {
            let min = Math.floor(time / 60);
            let sec = Math.floor(time % 60);
            return min + ':' + ((sec<10) ? ('0' + sec) : sec);
        }

    },

    created() {
        let vue = this;
        
        window.addEventListener('mousedown', function(event) {
        
        if(!vue.isDraggable(event.target)) 
            return false;

        vue.currentlyDragged = event.target;
        let handleMethod = vue.currentlyDragged.dataset.method;
        
        this.addEventListener('mousemove', vue[handleMethod], false);

            window.onmouseup = function () {
                // if (currentlyDragged !== null && currentlyDragged !== false)
                //     if (event.target.param !== null && event.target.param !== 'vol')
                //         player.currentTime = newtime;
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
                // if (currentlyDragged !== null && currentlyDragged !== false)
                //     if (event.target.param !== null && event.target.param !== 'vol')
                //         player.currentTime = newtime;
                vue.currentlyDragged = false;
                window.removeEventListener('touchmove', vue[handleMethod], false);
            }
        });
        
    },

    mounted() {
        player = this.$refs.audio;
        volume = this.$refs.volume;
        time = this.$refs.time;
    }
}
</script>

<style lang="scss" scoped>

    $main-font-color: white;

    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
                user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome and Opera */
    }

    #controls > * {
        cursor: pointer;
    }

    .song-info {
        color: $main-font-color;
    }

</style>

