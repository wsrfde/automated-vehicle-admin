import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
    define: {
      'process.env': {
        BASE_API: 'http://192.168.8.8:8000', // 生产环境
        WS_API: 'ws://192.168.8.8:8000/ws',
        THREE_URL: 'http://192.168.8.8:81', // 三维模型
      },
    },
  },
  baseConfig
);
