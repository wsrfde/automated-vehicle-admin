<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    width="500px"
    title="修改邮箱"
    @cancel="cancel"
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item
        label="新邮箱"
        field="oldPass"
        :validate-trigger="['change', 'blur']"
      >
        <a-input
          v-model="form.oldPass"
          type="password"
          auto-complete="on"
          style="width: 370px"
        />
        <a-button
          :loading="codeLoading"
          :disabled="isDisabled"
          size="small"
          @click="sendCode"
          >{{ buttonName }}</a-button
        >
      </a-form-item>
      <a-form-item
        label="验证码"
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
        label="当前密码"
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
import { updatePass, resetEmail } from '@/api/user';
import { useUserStore } from '@/store';
import { Notification } from '@arco-design/web-vue';
import { validEmail } from '@/utils/validate';

export default defineComponent({
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const visible = ref(false);
    const form: any = reactive({
      pass: '',
      email: '',
      code: '',
    });
    const formRef = ref<InstanceType<typeof Form>>();
    const store = useUserStore();
    const buttonName = ref('获取验证码');
    const codeLoading = ref(false);
    const isDisabled = ref(false);
    const time = ref(60);

    const validMail = (value, callback) => {
      if (value === '' || value === null) {
        callback('新邮箱不能为空');
      } else if (validEmail(value)) {
        callback();
      } else {
        callback('邮箱格式错误');
      }
    };

    const rules: { [k: string]: FieldRule[] } = {
      pass: [{ required: true, message: '当前密码不能为空' }],
      email: [{ required: true, validator: validMail }],
      code: [{ required: true, message: '验证码不能为空' }],
    };

    const show = () => {
      visible.value = true;
    };
    const cancel = () => {
      formRef.value?.clearValidate();
      formRef.value?.resetFields();
      visible.value = false;
    };

    const sendCode = () => {
      if (form.email && form.email !== props.email) {
        codeLoading.value = true;
        buttonName.value = '验证码发送中';
        // const _this = this;
        resetEmail(form.email)
          .then(() => {
            // this.$message({
            //   showClose: true,
            //   message: '发送成功，验证码有效期5分钟',
            //   type: 'success',
            // });
            // this.codeLoading = false;
            // this.isDisabled = true;
            // this.buttonName = `${this.time--}秒后重新发送`;
            // this.timer = window.setInterval(function () {
            //   _this.buttonName = `${_this.time}秒后重新发送`;
            //   --_this.time;
            //   if (_this.time < 0) {
            //     _this.buttonName = '重新发送';
            //     _this.time = 60;
            //     _this.isDisabled = false;
            //     window.clearInterval(_this.timer);
            //   }
            // }, 1000);
          })
          .catch((err) => {
            formRef.value?.resetFields();
            codeLoading.value = false;
            console.log(err.response.data.message);
          });
      }
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
      buttonName,
      codeLoading,
      isDisabled,
      time,
      show,
      handleBeforeOk,
      cancel,
      sendCode,
    };
  },
});
</script>

<style scoped></style>
