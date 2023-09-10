import { mergeConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    define: {
      'process.env': {
        // BASE_API: 'http://47.105.44.218', // 开发环境
        BASE_API: 'http://47.100.100.190:8000', // 开发环境
        // WS_API: 'ws://47.105.44.218/ws',
        WS_API: 'ws://47.100.100.190:8000/ws',
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
  baseConfig
);
