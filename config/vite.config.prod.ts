import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
    define: {
      'process.env': {
        BASE_API: 'http://localhost:8000', // 生产环境
        WS_API: 'ws://localhost:8000/ws',
        THREE_URL: 'http://192.168.8.8:81', // 三维模型
      },
    },
  },
  baseConfig
);
