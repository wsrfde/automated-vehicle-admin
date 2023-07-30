<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 8 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="nickname"
      label="昵称"
      :rules="[
        {
          required: true,
          message: '请输入昵称',
        },
      ]"
    >
      <a-input v-model="formData.nickname" placeholder="请输入您的昵称" />
    </a-form-item>
    <a-form-item
      field="profile"
      label="个人简介"
      :rules="[
        {
          maxLength: 200,
          message: '最多不超过200字',
        },
      ]"
      row-class="keep-margin"
    >
      <a-textarea
        v-model="formData.profile"
        placeholder="请输入您的个人简介，最多不超过200字。"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate"> 保存 </a-button>
        <a-button type="secondary" @click="reset"> 重置 </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { BasicInfoModel } from '@/api/user-center';

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const formData = ref<BasicInfoModel>({
      email: '',
      nickname: '',
      countryRegion: '',
      area: '',
      address: '',
      profile: '',
    });
    const validate = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        // do some thing
        // you also can use html-type to submit
      }
    };
    const reset = async () => {
      await formRef.value?.resetFields();
    };
    return {
      formRef,
      formData,
      validate,
      reset,
    };
  },
});
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 0 auto;
}
</style>
