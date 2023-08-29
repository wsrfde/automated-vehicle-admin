import defaultSettings from '@/config/settings';

export default {
  path: defaultSettings().monitorAddress,
  name: 'real-time-monitor',
  meta: {
    title: '实时监控',
    icon: 'icon-video-camera',
    requiresAuth: true,
    roles: ['*'],
  },
};
