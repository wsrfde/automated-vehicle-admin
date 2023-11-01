import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: 'crane',
  name: 'crane',
  component: () => import('@/views/crane/index.vue'),
  meta: {
    title: '天车管理',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: 'one-overhead-crane',
      name: 'OneOverheadCrane',
      component: () => import('@/views/crane/one-overhead-crane/index.vue'),
      meta: {
        title: '一号天车',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'two-overhead-crane',
      name: 'TwoOverheadCrane',
      component: () => import('@/views/crane/two-overhead-crane/index.vue'),
      meta: {
        title: '二号天车',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'functional-tests',
      name: 'FunctionalTests',
      component: () => import('@/views/crane/functional-tests/index.vue'),
      meta: {
        title: '功能测试',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
