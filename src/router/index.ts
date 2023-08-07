import { createRouter, createWebHistory, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css';

import usePermission from '@/hooks/permission';
import { useUserStore } from '@/store';
import PageLayout from '@/layout/page-layout.vue';
import { isLogin } from '@/utils/auth';
import Login from './modules/login';
import appRoutes from './modules';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    Login,
    {
      name: 'root',
      path: '/',
      component: PageLayout,
      children: appRoutes,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();
  async function crossroads() {
    const Permission = usePermission();
    // 判断用户是否有权限访问该路由
    if (Permission.accessRouter(to)) await next();
    else {
      const destination = Permission.findFirstPermissionRoute(
        appRoutes,
        userStore.role
      ) || {
        name: 'notFound',
      };
      await next(destination);
    }
    NProgress.done();
  }
  if (isLogin()) {
    // 判读用户是否登录
    if (userStore.role) {
      // 有角色信息表示当前用户已经登录且获取过用户信息
      await crossroads();
    } else {
      try {
        console.log('----');
        await userStore.info();
        await crossroads();
      } catch (error) {
        // 清除所有token，防止进入判断isLogin()的无限循环。
        // 当用户登录后，刷新页面，此时用户信息已经存在，但是token过期，此时需要清除用户信息
        localStorage.clear();
        next({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        });
        NProgress.done();
      }
    }
  } else {
    // 如果未登录则重定向到登录页面
    if (to.name === 'login') {
      next();
      NProgress.done();
      return;
    }
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    });
    NProgress.done();
  }
});

export default router;
