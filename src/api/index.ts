import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Notification } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { useRouter } from 'vue-router';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}
// set base url
axios.defaults.baseURL = process.env.BASE_API;
// add request interceptors
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (getToken()) {
      config.headers.Authorization = getToken(); // 让每个请求携带自定义token
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse, any>): any => {
    // :AxiosResponse<HttpResponse, any>
    return response.data;
  },
  async (error) => {
    // 兼容blob下载出错json提示
    if (
      error.response.data instanceof Blob &&
      error.response.data.type.toLowerCase().indexOf('json') !== -1
    ) {
      const reader = new FileReader();
      reader.readAsText(error.response.data, 'utf-8');
      reader.onload = () => {
        const errorMsg = JSON.parse(
          typeof reader.result === 'string' ? reader.result : ''
        ).message;
        Notification.error({
          content: errorMsg,
          duration: 5000,
        });
      };
    } else {
      let code = 0;
      // 判断请求异常信息中是否含有超时timeout字符串
      try {
        code = error.response.data.status;
      } catch (e) {
        if (error.toString().indexOf('Error: timeout') !== -1) {
          Notification.error({
            content: '网络请求超时',
            duration: 5000,
          });
          return Promise.reject(error);
        }
      }
      const userStore = useUserStore();
      const router = useRouter();

      switch (code) {
        case 400:
          Notification.error({
            title: '请求错误',
            content: error.response.data.message,
            duration: 3000,
          });
          break;
        case 401:
          Notification.error('未授权，请登录');
          await userStore.logout();
          window.location.reload();
          break;
        case 403:
          Notification.error('拒绝访问');
          router.push({ path: '/401' }).then();
          break;
        default:
          Notification.error({
            content: error.response.data.message || '网络请求异常',
            duration: 3000,
          });
      }
    }
    return Promise.reject(error);
  }
);
