<template>
  <a-card class="general-card" title="倒料与装车的绝对高度/速度">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="24">
          <a-form
            ref="formRef"
            :model="form"
            auto-label-width
            @submit="submitForm"
          >
            <a-form-item label="行车编号" field="id" required>
              <a-select v-model="form.id" allow-clear style="width: 300px">
                <a-option value="0">一车</a-option>
                <a-option value="1">二车</a-option>
              </a-select>
            </a-form-item>
            <a-form-item label="速度" field="speed" required>
              <a-input v-model="form.speed" style="width: 300px" />
            </a-form-item>
            <a-form-item label="天车状态" field="step" required>
              <a-select v-model="form.step" allow-clear style="width: 300px">
                <a-option value="2">装车</a-option>
                <a-option value="3">倒料</a-option>
              </a-select>
            </a-form-item>
            <a-form-item label="抓料绝对高度" field="pickingzz" required>
              <a-input v-model="form.pickingzz" style="width: 300px" />
            </a-form-item>
            <a-form-item label="放料相对高度" field="placeoz" required>
              <a-input v-model="form.placeoz" style="width: 300px" />
            </a-form-item>
            <a-form-item>
              <a-button html-type="submit">提交</a-button>
            </a-form-item>
          </a-form>
        </a-col>
      </a-row>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { Form } from '@arco-design/web-vue';

export default defineComponent({
  name: 'LoadAndReverseCarForm',
  props: {
    sendInstructionsFun: {
      type: Function,
      default: () => ({}),
    },
  },
  setup({ sendInstructionsFun }) {
    const formRef = ref<InstanceType<typeof Form>>();
    const form = reactive({
      id: '',
      speed: '',
      step: '',
      pickingzz: '',
      placeoz: '',
    });

    const submitForm = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const sedMsg = `craneid:${form.id};step:${form.step};auto:true;pickingzz:${form.pickingzz};placeoz:${form.placeoz};speed:${form.speed};`;
          sendInstructionsFun('jtgx/overhead-crane-handle/1', sedMsg);
        }
      });
    };

    return {
      formRef,
      form,
      submitForm,
    };
  },
});
</script>

<style scoped lang="less"></style>
