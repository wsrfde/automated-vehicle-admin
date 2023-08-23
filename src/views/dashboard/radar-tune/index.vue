<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '雷达微调']" />
    <a-spin :loading="loading" style="width: 100%">
      <a-card class="general-card">
        <template #title> 雷达微调 </template>
        <div class="wrapper">
          <a-steps
            v-model:current="step"
            style="width: 380px"
            line-less
            class="steps"
          >
            <a-step description="填写雷达信息"> 基本信息 </a-step>
            <a-step description="微调成功"> 完成微调 </a-step>
          </a-steps>
          <keep-alive>
            <BaseInfo v-if="step === 1" @change-step="changeStep" />
            <Success v-else-if="step === 2" @change-step="changeStep" />
          </keep-alive>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import BaseInfo from './components/base-info.vue';
import Success from './components/success.vue';

export default defineComponent({
  components: {
    BaseInfo,
    Success,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    const step = ref(1);
    const submitModel = ref({});
    const submitForm = async () => {
      setLoading(true);
      try {
        // await submitChannelForm(submitModel.value); // The moack api default success
        step.value = 3;
        submitModel.value = {}; // init
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const changeStep = (
      direction: string | number,
      model: {
        activityName: string;
        channelType: string;
        promotionTime: string[];
        promoteLink: string;
      }
    ) => {
      if (typeof direction === 'number') {
        step.value = direction;
        return;
      }

      if (direction === 'forward' || direction === 'submit') {
        submitModel.value = {
          ...submitModel.value,
          ...model,
        };
        if (direction === 'submit') {
          submitForm();
          return;
        }
        step.value += 1;
      } else if (direction === 'backward') {
        step.value -= 1;
      }
    };
    return {
      loading,
      step,
      changeStep,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
  :deep(.arco-form) {
    .arco-form-item {
      &:last-child {
        margin-top: 20px;
      }
    }
  }
}

.steps {
  margin-bottom: 76px;
}
</style>
