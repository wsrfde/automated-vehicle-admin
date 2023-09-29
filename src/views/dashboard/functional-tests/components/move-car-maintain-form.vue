<template>
  <a-card class="general-card" title="移动行车并进入维修/待命状态">
    <a-space direction="vertical" style="width: 100%" size="medium">
      <a-row>
        <a-col :span="24">
          <a-form ref="formRef" :model="form" @submit="submitForm">
            <a-form-item label="行车编号" field="id" required>
              <a-select v-model="form.id" allow-clear style="width: 300px">
                <a-option value="0">一车</a-option>
                <a-option value="1">二车</a-option>
              </a-select>
            </a-form-item>
            <a-form-item label="相对位置" field="move" required>
              <a-input-group>
                <a-input
                  v-model="form.move[0]"
                  :style="{ width: '100px' }"
                  placeholder="X"
                />
                <a-input
                  v-model="form.move[1]"
                  :style="{ width: '100px' }"
                  placeholder="Y"
                />
                <a-input
                  v-model="form.move[2]"
                  :style="{ width: '100px' }"
                  placeholder="Z"
                />
              </a-input-group>
            </a-form-item>
            <a-form-item label="速度" field="speed" required>
              <a-input v-model="form.speed" style="width: 300px" />
            </a-form-item>
            <a-form-item label="天车状态" field="step" required>
              <a-select v-model="form.step" allow-clear style="width: 300px">
                <a-option value="0">维修</a-option>
                <a-option value="1">待命</a-option>
              </a-select>
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
  name: 'MoveCarMaintainForm',
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
      move: [],
      speed: '100',
      step: '',
    });

    const submitForm = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const sedMsg = `craneid:${form.id};step:${
            form.step
          };auto:true;moveto:${form.move.join()};speed:${form.speed};`;
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
