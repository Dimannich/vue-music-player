export default {
  data() {
    return {
      windowHeight: 0,
      windowWidth: 0,
    };
  },

  created() {
    window.addEventListener('resize', this.getWindowSize);
    this.getWindowSize();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowSize);
  },

  methods: {
    getWindowSize(offset = 0) {
      /* #TODO for debug purpose, remove */
      offset = 260;
      console.log(document.getElementsByClassName('main-panel'));
      this.windowHeight = window.innerHeight;
      this.windowWidth =
        document.getElementsByClassName('main-panel')[0] !== undefined
          ? document.getElementsByClassName('main-panel')[0].offsetWidth
          : window.innerWidth - offset;
    },
  },
};
