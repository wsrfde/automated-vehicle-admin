<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    width="400px"
    title="急停确认"
    @cancel="cancel"
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
        <a-input v-model="form.pwd" auto-complete="on" style="width: 200px" />
        <template #extra>
          <div>我已清楚并明确紧急停止原因及后果，密码9999</div>
        </template>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { Form } from '@arco-design/web-vue';
// import { updatePass } from '@/api/user';
// import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const form = reactive({
      pwd: '',
    });
    const formRef = ref<InstanceType<typeof Form>>();

    const show = () => {
      visible.value = true;
    };
    const cancel = () => {
      formRef.value?.clearValidate();
      formRef.value?.resetFields();
      visible.value = false;
    };

    const validatePwd = (value: string, cb) => {
      if (value !== '9999') {
        cb('密码错误');
      }
      return Promise.resolve();
    };
    const handleBeforeOk = (done) => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          done();
          // updatePass().then(() => {
          //   done();
          //   Notification.success('密码修改成功，请重新登录');
          //   setTimeout(() => {
          //     store.logout().then(() => {
          //       window.location.reload();
          //     });
          //   }, 1500);
          // });
        } else {
          done(false);
        }
      });
    };

    return {
      formRef,
      visible,
      form,
      show,
      handleBeforeOk,
      validatePwd,
      cancel,
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
