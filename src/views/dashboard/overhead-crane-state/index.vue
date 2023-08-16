<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '天车状态']" />
    <CarAlert />
    <AlarmAlert />
    <div class="car-box">
      <a-card class="custom-card" title="天车 #01">
        <CraneStep
          class="mb15"
          :current-step="currentStep"
          :step-option="stepOption"
        />
        <a-layout>
          <a-layout-content>
            <CraneCoordinates />
          </a-layout-content>
          <a-layout-content class="ml15">
            <CraneState />
          </a-layout-content>
          <a-layout-sider style="width: 14vw" class="ml15">
            <CraneHandle
              :current-step="currentStep"
              :step-option="stepOption"
              @change-step="changeStep"
            />
          </a-layout-sider>
        </a-layout>
      </a-card>
      <a-divider />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CraneStep from './components/crane-step.vue';
import CraneHandle from './components/crane-handle.vue';
import CarAlert from './components/car-alert.vue';
import AlarmAlert from './components/alarm-alert.vue';
import CraneState from './components/crane-state.vue';
import CraneCoordinates from './components/crane-coordinates.vue';

export default defineComponent({
  components: {
    AlarmAlert,
    CarAlert,
    CraneHandle,
    CraneStep,
    CraneCoordinates,
    CraneState,
  },
  setup() {
    const currentStep = ref(2);
    const stepOption = [
      {
        title: '维修',
        value: 1,
      },
      {
        title: '待命',
        value: 2,
      },
      {
        title: '预备装车',
        value: 3,
      },
      {
        title: '装车',
        value: 4,
      },
      {
        title: '倒料',
        value: 5,
      },
    ];

    const changeStep = (step: number) => {
      currentStep.value = step;
    };

    return {
      currentStep,
      stepOption,
      changeStep,
    };
  },
});
</script>

<style scoped lang="less">
.mb15 {
  margin-bottom: 15px;
}
.ml15 {
  margin-left: 15px;
}
.container {
  padding: 0 20px 20px 20px;
}
.car-box {
  margin-top: 20px;
  .custom-card {
    background: none;
    :deep(.arco-card-header) {
      background: var(--color-bg-2);
    }
    :deep(& > .arco-card-body) {
      padding: 0;
    }
    &:last-child {
      //margin-top: 20px;
    }
  }
}
</style>
