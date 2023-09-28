<template>
  <a-card class="general-card" title="移动行车坐标">
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
  name: 'MoveCarForm',
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
      speed: '',
    });

    const submitForm = () => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const sedMsg = `craneid:${form.id};moveto:${form.move.join()};speed:${
            form.speed
          };`;
          sendInstructionsFun('gtai/movingctrl', sedMsg);
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
