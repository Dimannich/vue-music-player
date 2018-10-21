<template>
  <div id="app" class="container-fluid">
     <div class="row">
            <div class="col-md-3">
                <main-nav params="route: route"></main-nav>
            </div>
            <div class="col-sm-9">
                <router-view></router-view>
            </div>
            <div class="col-12">
                <music-player></music-player>
            </div>
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
