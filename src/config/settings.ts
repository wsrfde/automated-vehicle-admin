import { AppStore } from '../store/modules/app/types';

export default (): AppStore => ({
  title: '无人行车智能管理系统',
  theme: 'light',
  colorWeek: false,
  navbar: true,
  menu: true,
  menuCollapse: false,
  footer: true,
  themeColor: '#165DFF',
  menuWidth: 250,
  globalSettings: false,
  defaultRouter: 'overheadCraneState',
  monitorAddress:
    localStorage.getItem('monitorAddress') || 'http://192.168.8.20',
});
