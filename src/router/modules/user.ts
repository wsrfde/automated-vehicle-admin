export default {
  path: 'user',
  name: 'user',
  component: () => import('@/views/user/index.vue'),
  meta: {
    title: '个人中心',
    icon: 'icon-user',
    requiresAuth: true,
  },
  children: [
    {
      path: 'setting',
      name: 'setting',
      component: () => import('@/views/user/setting/index.vue'),
      meta: {
        title: '用户设置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'manage',
      name: 'manage',
      component: () => import('@/views/user/manage/index.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
        roles: ['superAdmin'],
      },
    },
  ],
};
