<template>
  <div id="app" class="container-fluid">
     <div class="align-items-end wrapper">
                <!-- <main-nav params="route: route"></main-nav> -->
            <side-bar></side-bar>
            <div class="main-panel" style="background-color: transparent;">
               <router-view></router-view>
            </div>
            <!-- <div class="col-sm-9">
                <router-view></router-view>
            </div> -->
            <music-player></music-player>
        </div>
  </div>
</template>


<script>
import MainNav from "./components/MainNav.vue";
import MusicPlayer from "./components/MusicPlayer.vue";

export default {
  name: "app",
  components: {
    MainNav,
    MusicPlayer
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
