import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useCraneStore from './modules/crane';
import useUserStore from './modules/user';

const pinia = createPinia();

export { useAppStore, useUserStore, useCraneStore };
export default pinia;
