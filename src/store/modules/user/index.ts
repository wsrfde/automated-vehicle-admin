import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { ALL_ROLES } from '@/utils/dictionary';
import { UserState } from './types';

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    avatarName: undefined,
    avatarPath: undefined,
    createTime: undefined,
    dept: undefined,
    deptId: undefined,
    email: undefined,
    enabled: undefined,
    gender: undefined,
    id: undefined,
    isAdmin: undefined,
    jobs: undefined,
    nickName: undefined,
    password: undefined,
    phone: undefined,
    pwdResetTime: undefined,
    updateBy: undefined,
    updateTime: undefined,
    username: undefined,
    role: '',
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user';
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial); // 在这里会设置role
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    // 在路由守卫中被调用
    async info() {
      const res: any = await getUserInfo();
      if (res.roles.length < 0) {
        throw Error('用户没有权限');
      }
      delete res.user.roles;
      const user = {
        ...res.user,
        role: ALL_ROLES.includes(res.user.nickName)
          ? res.user.nickName
          : res.roles[0], // 后端不肯加role字段，用nickName代替
      };
      this.setInfo(user);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res: any = await userLogin(loginForm);
        setToken(res.token);
        this.setInfo(res.user);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      await userLogout();

      this.resetInfo();
      clearToken();
    },
  },
});

export default useUserStore;
