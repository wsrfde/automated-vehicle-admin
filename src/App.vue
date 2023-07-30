<template>
  <a-config-provider>
    <router-view></router-view>
    <global-setting />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import GlobalSetting from '@/components/global-setting/index.vue';

export default defineComponent({
  components: {
    GlobalSetting,
  },
});
</script>
