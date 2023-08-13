<template>
  <a-config-provider>
    <router-view v-if="isRouterAlive"></router-view>
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick, provide } from 'vue';
import GlobalSetting from '@/components/global-setting/index.vue';

export default defineComponent({
  components: {
    GlobalSetting,
  },
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide('reload', reload);
    return { isRouterAlive };
  },
});
</script>
