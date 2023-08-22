<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    width="400px"
    title="急停确认"
    @before-open="beforeOpen"
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" class="custom-form">
      <a-form-item
        label="停止密码"
        field="pwd"
        :rules="[
          { required: true, message: '请输入密码' },
          { validator: validatePwd },
        ]"
        :validate-trigger="['change']"
      >
        <a-input
          v-model="form.pwd"
          auto-complete="on"
          style="width: 200px"
          @keyup.enter="handleBeforeOk"
        />
        <template #extra>
          <div>我已清楚并明确紧急停止原因及后果，密码999</div>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { Form } from '@arco-design/web-vue';
import { emergencyStop } from '@/api/dashboard';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  emits: ['changeState'],
  setup(props, { emit }) {
    const visible = ref(false);
    const form = reactive({
      pwd: '',
    });
    const formRef = ref<InstanceType<typeof Form>>();

    const beforeOpen = () => {
      formRef.value?.clearValidate();
      formRef.value?.resetFields();
    };
    const show = () => {
      visible.value = true;
    };
    const hide = () => {
      visible.value = false;
    };

    const validatePwd = (value: string, cb) => {
      if (value !== '999') {
        cb('密码错误');
      }
      return Promise.resolve();
    };
    // 函数可能会被enter调用，所以done给去除了
    const handleBeforeOk = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          emit('changeState', true);
        }
      });
    };

    return {
      formRef,
      visible,
      form,
      show,
      hide,
      handleBeforeOk,
      validatePwd,
      beforeOpen,
    };
  },
});
</script>

<style scoped lang="less">
.custom-form {
  :deep(.arco-row) {
    .arco-form-item-label-col {
      //flex-basis: 100px;
      flex: 1;
    }
    .arco-form-item-wrapper-col {
      flex: 3;
    }
  }
}
</style>
