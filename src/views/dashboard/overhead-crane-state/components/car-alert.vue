<template>
  <a-alert banner class="custom-alert">
    <template #icon>
      <icon-sound-fill />
    </template>
    <span>通知：</span>
    <div class="alert-box">
      <transition appear>
        <p v-if="isShow" class="alert-text">
          <span>车辆{{ newCarTips.license }}进入门闸</span>
          <span>{{ newCarTips.passTime }}</span>
        </p>
      </transition>
    </div>
  </a-alert>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, watch } from 'vue';

export default defineComponent({
  props: {
    carTips: {
      type: Object as PropType<any>,
      default: () => ({}),
    },
  },
  setup(props) {
    const isShow = ref(false);
    const newCarTips = reactive<{ license?: string; passTime?: string }>({});
    watch(
      () => props.carTips,
      (e) => {
        // 这里只判断进入的车辆
        if (e.state === 'in') {
          isShow.value = false;
          Object.assign(newCarTips, e);
          setTimeout(() => {
            isShow.value = true;
          }, 1000);
        }
      },
      { deep: true },
    );

    return { isShow, newCarTips };
  },
});
</script>

<style scoped lang="less">
.custom-alert {
  border: 1px solid #6facf7;
  :deep(.arco-alert-content) {
    display: flex;
    .alert-box {
      flex: 1;
      position: relative;
      overflow: hidden;
    }
  }
}
.alert-text {
  margin: 0;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0;
  width: 100%;
}
/* 进入动画前和动画结束后，demo应为隐藏状态 */
.v-enter-from {
  left: -10%;
}
.v-enter-to {
  left: 0;
}
/* 进入动画完成和结束动画开始，demo应为显示状态 */

.v-leave-from {
  left: 0;
}

.v-leave-to {
  left: 100%;
}

/* 为整个动画过程设置过渡效果 */
.v-enter-active {
  transition: left 2s ease;
}

.v-leave-active {
  transition: left 1s ease-in-out;
}
</style>
