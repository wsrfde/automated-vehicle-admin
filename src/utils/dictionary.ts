// 数据字典，暂时存放在utils中，如果后面多再单独建立文件夹

import { RoleType } from '@/store/modules/user/types';
// 所有权限
export const ALL_ROLES: RoleType[] = ['*', 'super_admin', 'admin', 'user'];
// 天车状态
// export const CRANE_OPTION: { title: string; value: number }[] = [
//   {
//     title: '维修',
//     value: 0,
//   },
//   {
//     title: '待命',
//     value: 1,
//   },
//   {
//     title: '预备装车',
//     value: 4,
//   },
//   {
//     title: '装车',
//     value: 2,
//   },
//   {
//     title: '倒料',
//     value: 3,
//   },
// ];
export const CRANE_OPTION: { title: string; value: number | string }[] = [
  {
    title: '待命',
    value: '',
  },
  {
    title: '移动',
    value: 'movingTo',
  },
  {
    title: '卸料',
    value: 'loadingIn',
  },
  {
    title: '倒料',
    value: 'Preparing',
  },
  {
    title: '扫描',
    value: 'Scaning',
  },
  {
    title: '装车',
    value: 'loadingOut',
  },
];
