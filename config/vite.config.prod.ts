import { mergeConfig } from 'vite';
import baseConig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'production',
    define: {
      'process.env': {
        BASE_API: 'http://47.105.44.218', // 生产环境
      },
    },
  },
  baseConig
);
