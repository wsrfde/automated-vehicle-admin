import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: '',
    requiresAuth: false,
  },
};
