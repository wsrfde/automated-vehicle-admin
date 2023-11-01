<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="activityName"
      label="雷达名称"
      :rules="[
        {
          required: true,
          message: '请输入',
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
          message: '输入汉字、字母或数字，最多20字符',
        },
      ]"
    >
      <a-input v-model="formData.activityName" placeholder="请输入" />
    </a-form-item>
    <a-form-item
      field="channelType"
      label="X轴修正"
      :rules="[
        {
          required: true,
          message: '请选择',
        },
      ]"
    >
      <a-select v-model="formData.channelType" placeholder="请选择">
        <a-option>左偏移</a-option>
        <a-option>右偏移</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="promotionTime"
      label="修改时间"
      :rules="[
        {
          required: true,
          message: '请选择',
        },
      ]"
    >
      <a-range-picker v-model="formData.promotionTime" />
    </a-form-item>
    <a-form-item
      field="promoteLink"
      label="修改地址"
      :rules="[
        {
          required: true,
          message: '请输入',
        },
      ]"
      row-class="keep-margin"
    >
      <a-input v-model="formData.promoteLink" placeholder="请输入" />
      <template #help>
        <span>修改注意事项：XXXXXXX</span>
      </template>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick"> 提交 </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
// import { BaseInfoModel } from '@/api/form';

export default defineComponent({
  emits: ['changeStep'],
  setup(props, ctx) {
    const formRef = ref<FormInstance>();
    const formData = ref({
      activityName: '',
      channelType: '',
      promotionTime: [],
      promoteLink: '',
    });

    const onNextClick = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        ctx.emit('changeStep', 'forward', { ...formData.value });
      }
    };

    return {
      formData,
      formRef,
      onNextClick,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 20px;
  .keep-margin {
    margin-bottom: 20px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
}

.steps {
  margin-bottom: 36px;
}

.form {
  width: 500px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
