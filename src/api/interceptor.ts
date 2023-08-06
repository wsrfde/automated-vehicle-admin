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
// TODO：这里需要判断，如果是开发环境，就使用本地的API，如果是生产环境，就使用线上的地址
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
  (
    response: AxiosResponse<HttpResponse, any>
  ): AxiosResponse<HttpResponse, any> => {
    // const res = response.data;
    // 如果自定义代码不是20000，则判定为错误。
    // if (res.code !== 20000) {
    //   Message.error({
    //     content: res.msg || 'Error',
    //     duration: 5 * 1000,
    //   });
    //   // 50008:非法令牌;50012:其他客户端登录;50014:令牌过期;
    //   if (
    //     [50008, 50012, 50014].includes(res.code) &&
    //     response.config.url !== '/api/user/info'
    //   ) {
    //     Modal.error({
    //       title: '确认注销',
    //       content: '您已登出，您可以取消停留在此页面，或重新登录',
    //       okText: '重新登录',
    //       async onOk() {
    //         const userStore = useUserStore();
    //
    //         await userStore.logout();
    //         window.location.reload();
    //       },
    //     });
    //   }
    //   return Promise.reject(new Error(res.msg || 'Error'));
    // }
    // return res;
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
        const errorMsg = JSON.parse(reader.result).message;
        Notification.error({
          title: errorMsg,
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
            title: '网络请求超时',
            duration: 5000,
          });
          return Promise.reject(error);
        }
      }
      const userStore = useUserStore();
      const router = useRouter();

      switch (code) {
        case 400:
          Notification.error('请求错误');
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
            title: error.response.data.message || '网络请求异常',
            duration: 5000,
          });
      }
    }
    return Promise.reject(error);
  }
);
