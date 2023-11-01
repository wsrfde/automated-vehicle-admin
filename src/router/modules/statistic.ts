import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: 'statistic',
  name: 'statistic',
  component: () => import('@/views/statistic/index.vue'),
  meta: {
    title: '车辆统计',
    requiresAuth: true,
    icon: 'icon-nav',
  },
  children: [
    /** simple */
    // {
    //   path: 'monitor',
    //   name: 'monitor',
    //   component: () => import('@/views/statistic/monitor/index.vue'),
    //   meta: {
    //     title: '实时监控',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
    /** simple end */
    {
      path: 'vehicle-manage',
      name: 'vehicleManage',
      component: () => import('@/views/statistic/vehicle-manage/index.vue'),
      meta: {
        title: '车辆管理',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'job-statistics',
      name: 'jobStatistics',
      component: () => import('@/views/statistic/job-statistics/index.vue'),
      meta: {
        title: '工作统计',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    // {
    //   path: 'radar-tune',
    //   name: 'radarTune',
    //   component: () => import('@/views/statistic/radar-tune/index.vue'),
    //   meta: {
    //     title: '雷达微调',
    //     requiresAuth: true,
    //     roles: ['*'],
    //   },
    // },
  ],
};
