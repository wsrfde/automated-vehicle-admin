import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: 'visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    title: '数据可视化',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      path: 'multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () =>
        import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        title: '数据分析',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'overhead-crane-model',
      name: 'overheadCraneModel',
      component: () =>
        import('@/views/visualization/overhead-crane-model/index.vue'),
      meta: {
        title: '天车模型',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};
