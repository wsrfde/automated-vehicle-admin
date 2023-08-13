export default {
  path: 'dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    /** simple */
    // {
    //   path: 'monitor',
    //   name: 'monitor',
    //   component: () => import('@/views/dashboard/monitor/index.vue'),
    //   meta: {
    //     title: '实时监控',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    /** simple end */
    {
      path: 'overhead-crane-state',
      name: 'overheadCraneState',
      component: () =>
        import('@/views/dashboard/overhead-crane-state/index.vue'),
      meta: {
        title: '天车状态',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'vehicle-manage',
      name: 'vehicleManage',
      component: () => import('@/views/dashboard/vehicle-manage/index.vue'),
      meta: {
        title: '车辆管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
