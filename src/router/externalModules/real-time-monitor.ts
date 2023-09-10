import defaultSettings from '@/config/settings';
import { RouteRecordRaw } from 'vue-router';

export default <RouteRecordRaw>{
  path: defaultSettings().monitorAddress,
  redirect: '',
  name: 'real-time-monitor',
  meta: {
    title: '实时监控',
    icon: 'icon-video-camera',
    requiresAuth: true,
    roles: ['*'],
  },
};
