import 'vue-router';
import { RoleType } from '@/store/modules/user/types';

declare module 'vue-router' {
  interface RouteMeta {
    // options
    roles?: RoleType[];
    // every route must declare
    requiresAuth: boolean; // need login
    icon?: string;
    // menu select key
    menuSelectKey?: string;
    hideInMenu?: boolean;
    // 新增属性
    title?: string;
  }
}
