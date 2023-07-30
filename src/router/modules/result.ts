export default {
  path: 'result',
  name: 'result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    title: '结果页',
    icon: 'icon-check-circle',
    requiresAuth: true,
  },
  children: [
    {
      path: 'success',
      name: 'success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        title: '成功页',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'error',
      name: 'error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        title: '失败页',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
