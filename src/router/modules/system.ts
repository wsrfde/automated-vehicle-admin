import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: 'system',
  name: 'system',
  component: () => import('@/views/system/index.vue'),
  meta: {
    title: '系统监控',
    icon: 'icon-computer',
    requiresAuth: true,
  },
  children: [
    {
      path: 'system-log',
      name: 'SystemLog',
      component: () => import('@/views/system/system-log/index.vue'),
      meta: {
        title: '操作日志',
        requiresAuth: true,
        roles: ['super_admin'],
      },
    },
  ],
};
