import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recentlyPlayedSongs: [
      {
        title: 'rockstar',
        artist: 'Post Malone, 21 Savage',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg',
        src:
          'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3',
        totalTime: '0:00',
      },
      {
        title: 'Let You Down',
        artist: 'NF',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/perception-album-cover.png',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/NF%20-%20Let%20You%20Down.mp3',
        totalTime: '0:00',
      },
      {
        title: 'Silence',
        artist: 'Marshmello, Khalid',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3',
        totalTime: '0:00',
      },
      {
        title: 'I Fall Apart',
        artist: 'Post Malone',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3',
        totalTime: '0:00',
      },
      {
        title: 'Fireproof',
        artist: 'VAX, Teddy Sky',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3',
        totalTime: '0:00',
      },
    ],
    activeSong: [
      {
        title: 'Silence',
        artist: 'Marshmello, Khalid',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/silence-album-cover.jpg',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Marshmello%20-%20Silence%20ft.%20Khalid.mp3',
        totalTime: '0:00',
      },
      {
        title: 'I Fall Apart',
        artist: 'Post Malone',
        cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/stoney-cover-album.jpg',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20I%20Fall%20Apart.mp3',
        totalTime: '0:00',
      },
    ],
    songIndex: 0,
  },
  mutations: {
    addSong(state, song) {
      state.recentlyPlayedSongs.unshift({
        title: 'Hello world',
        artist: 'test',
        cover: 'cover',
        src: 'some',
        totalTime: '2:00',
      });
    },
    setActive(state, song) {
      state.activeSong = [
        {
          title: 'Fireproof',
          artist: 'VAX, Teddy Sky',
          cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/fireproof-album-cover.jpeg',
          src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/VAX%20-%20Fireproof%20Feat%20Teddy%20Sky.mp3',
          totalTime: '0:00',
        },
        {
          title: 'rockstar',
          artist: 'Post Malone, 21 Savage',
          cover: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/rockstar-album-cover.jpg',
          src:
            'https://s3-us-west-2.amazonaws.com/s.cdpn.io/308622/Post%20Malone%20-%20rockstar%20ft.%2021%20Savage%20(1).mp3',
          totalTime: '0:00',
        },
      ];
    },
    setIndex(state, index) {
      state.songIndex = index;
    },
  },
  actions: {
    setActive(context) {
      context.commit('setActive');
      context.commit('setIndex', 0);
    },
  },
  getters: {
    activeSongList(state) {
      return state.activeSong;
    },
    songIndex(state) {
      return state.songIndex;
    },
  },
});
