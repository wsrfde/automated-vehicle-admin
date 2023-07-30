export default {
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
        title: '多维数据分析',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};
