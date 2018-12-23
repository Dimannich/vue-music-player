import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '../router/routes';

Vue.use(VueRouter);

/* eslint-disable no-new */
const router = new VueRouter({
  routes,
  mode: 'history',
});

export default router;
