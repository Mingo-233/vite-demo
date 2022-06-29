import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/preview',
    name: 'preview',
    component: () => import('@/views/preview/index.vue')
  }
];

const router = createRouter({
  history: createWebHistory('/folder'),
  routes
});

export default router;
