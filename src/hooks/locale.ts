import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Message } from '@arco-design/web-vue';

export default function useLocale() {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = (value: string) => {
    i18.locale.value = value;
    localStorage.setItem('arco-locale', value);
    Message.success('切换为中文');
  };
  return {
    currentLocale,
    changeLocale,
  };
}
