// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Overview from '../components/views/Overview.vue';
import Landing from '../components/views/Landing.vue';
import ArtistsView from '../components/views/ArtistsView.vue';
import SongsView from '../components/views/SongsView.vue';
import AlbumsView from '../components/views/AlbumsView.vue';

const routes = [
  {
    path: '/',
    name: 'landing',
    component: Landing,
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview,
  },
  {
    path: '/artists',
    name: 'artists',
    component: ArtistsView,
  },
  {
    path: '/songs',
    name: 'songs',
    component: SongsView,
  },
  {
    path: '/albums',
    name: 'albums',
    component: AlbumsView,
  },
  {
    path: '/genres',
    name: 'genres',
    component: Overview,
  },
  {
    path: '/festival',
    name: 'festival',
    component: Overview,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("spotify_token");

  if ((!token || token === 'null') && to.path !== '/') {
    next('/');
  } else if (token && to.path === '/') {
    next('/overview');
  } else {
    next();
  }
});

export default router;
