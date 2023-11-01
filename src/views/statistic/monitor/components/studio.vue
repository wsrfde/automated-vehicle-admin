<template>
  <a-card class="general-card" title="监控预览">
    <template #extra>
      <icon-more />
    </template>
    <div class="studio-wrapper">
      <div class="studio-box">
        <img
          v-for="i in 6"
          :key="i"
          src="@/assets/images/monitor-img.png"
          class="studio-preview"
          alt="图片"
        />
      </div>
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
  &-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 66vw;
  }
  &-preview {
    width: 21.6vw;
    margin: 0.2vw;
  }

  &-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
