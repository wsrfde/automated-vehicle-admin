export default {
  path: 'profile',
  name: 'profile',
  component: () => import('@/views/profile/index.vue'),
  meta: {
    title: '详情页',
    requiresAuth: true,
    icon: 'icon-file',
  },
  children: [
    {
      path: 'basic',
      name: 'basic',
      component: () => import('@/views/profile/basic/index.vue'),
      meta: {
        title: '基础详情页',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
