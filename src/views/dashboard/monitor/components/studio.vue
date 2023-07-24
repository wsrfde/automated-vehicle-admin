<template>
  <a-card class="general-card" :title="$t('monitor.title.studioPreview')">
    <template #extra>
      <icon-more />
    </template>
    <div class="studio-wrapper">
      <img src="@/assets/images/monitor-img.jpg" class="studio-preview" />
      <div class="studio-bar">
        <div></div>
        <a-typography-text type="secondary">
          当前时间： {{ currentTime }}
        </a-typography-text>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/store';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const currentTime = ref();
    setInterval(() => {
      currentTime.value = new Date().toLocaleString();
    }, 1000);

    return {
      userInfo: userStore,
      currentTime,
    };
  },
});
</script>

<style scoped lang="less">
.studio {
  &-preview {
    display: block;
    max-width: 600px;
    margin: 0 auto;
  }

  &-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
