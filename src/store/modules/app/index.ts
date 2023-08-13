import { defineStore } from 'pinia';
import defaultSettings from '@/config/settings';
import { AppState } from './types';

const useAppStore = defineStore('app', {
  state: (): AppState => ({ ...defaultSettings() }),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return { ...state };
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // Change theme color
    toggleTheme(dark: boolean) {
      if (dark) {
        this.theme = 'dark';
        document.body.setAttribute('arco-theme', 'dark');
      } else {
        this.theme = 'light';
        document.body.removeAttribute('arco-theme');
      }
    },
    changeMonitorAddress(payload: string) {
      this.monitorAddress = payload;
      localStorage.setItem('monitorAddress', this.monitorAddress);
    },
  },
});

export default useAppStore;
