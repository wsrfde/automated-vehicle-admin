import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: 'https://www.baidu.com',
  name: 'radar-fine-tune',
  meta: {
    title: '雷达微调',
    icon: 'icon-paste',
    requiresAuth: true,
    roles: ['super_admin'],
  },
};
