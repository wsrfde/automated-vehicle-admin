<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    width="500px"
    title="修改密码"
    @cancel="cancel"
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item
        label="旧密码"
        field="oldPass"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="form.oldPass"
          type="password"
          auto-complete="on"
          style="width: 370px"
        />
      </a-form-item>
      <a-form-item
        label="新密码"
        field="newPass"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="form.newPass"
          type="password"
          auto-complete="on"
          style="width: 370px"
        />
      </a-form-item>
      <a-form-item
        label="确认密码"
        field="confirmPass"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="form.confirmPass"
          type="password"
          auto-complete="on"
          style="width: 370px"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import type { FieldRule, Form } from '@arco-design/web-vue';
import encrypt from '@/utils/rsaEncrypt';
import { updatePass } from '@/api/user';
import { useUserStore } from '@/store';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  setup() {
    const visible = ref(false);
    const form = reactive({
      oldPass: '',
      newPass: '',
      confirmPass: '',
    });
    const formRef = ref<InstanceType<typeof Form>>();
    const store = useUserStore();

    const confirmPass = (value, callback) => {
      if (value) {
        if (form.newPass !== value) {
          callback('两次输入的密码不一致');
        } else {
          callback();
        }
      } else {
        callback('请再次输入密码');
      }
    };

    const rules: { [k: string]: FieldRule[] } = {
      oldPass: [
        {
          required: true,
          message: '请输入旧密码',
        },
      ],
      newPass: [
        { required: true, message: '请输入新密码' },
        { minLength: 6, maxLength: 20, message: '长度在 6 到 20 个字符' },
      ],
      confirmPass: [{ required: true, validator: confirmPass }],
    };

    const show = () => {
      visible.value = true;
    };
    const cancel = () => {
      formRef.value?.clearValidate();
      formRef.value?.resetFields();
      visible.value = false;
    };

    const handleBeforeOk = (done) => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const data = {
            oldPass: encrypt(form.oldPass),
            newPass: encrypt(form.newPass),
          };
          updatePass(data).then(() => {
            done();
            Notification.success('密码修改成功，请重新登录');
            setTimeout(() => {
              store.logout().then(() => {
                window.location.reload();
              });
            }, 1500);
          });
        } else {
          done(false);
        }
      });
    };

    return {
      formRef,
      visible,
      form,
      rules,
      show,
      handleBeforeOk,
      cancel,
    };
  },
});
</script>

<style scoped></style>
