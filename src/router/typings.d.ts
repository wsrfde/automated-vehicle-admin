import 'vue-router';

export type roles = 'super_admin' | 'admin' | 'user' | '*';

declare module 'vue-router' {
  interface RouteMeta {
    // options
    roles?: roles[];
    // every route must declare
    requiresAuth: boolean; // need login
    icon?: string;
    // menu select key
    menuSelectKey?: string;
    hideInMenu?: boolean;
  }
}
