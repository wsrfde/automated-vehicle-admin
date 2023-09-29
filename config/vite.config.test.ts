import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    define: {
      'process.env': {
        BASE_API: 'http://192.168.8.8:8000',
        WS_API: 'ws://192.168.8.8:8083', // 测试环境
        THREE_URL: 'http://three.iojun.com/', // 三维模型
      },
    },
    server: {
      open: true,
      fs: {
        strict: true,
      },
    },
    plugins: [
      eslint({
        cache: false,
        include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
        exclude: ['node_modules'],
      }),
    ],
  },
  baseConfig,
);
