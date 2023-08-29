import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
    define: {
      'process.env': {
        BASE_API: 'http://47.105.44.218', // 生产环境
        WS_API: 'ws://47.105.44.218/ws',
        THREE_URL: 'http://192.168.8.8:81', // 三维模型
      },
    },
  },
  baseConig
);
