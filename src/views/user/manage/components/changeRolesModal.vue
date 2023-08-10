<template>
  <a-modal
    v-model:visible="visible"
    :mask-closable="false"
    width="500px"
    :title="title"
    @cancel="cancel"
    @before-ok="handleBeforeOk"
  >
    <a-form ref="formRef" :model="form" :rules="rules">
      <a-form-item
        label="角色名称"
        field="name"
        :validate-trigger="['change', 'blur']"
      >
        <a-input v-model="form.name" style="width: 370px" />
      </a-form-item>
      <a-form-item
        label="角色KEY"
        field="description"
        :validate-trigger="['change', 'blur']"
      >
        <a-input v-model="form.description" style="width: 370px" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { FieldRule, Form } from '@arco-design/web-vue';
import { addRole, editRole } from '@/api/user';
import { Notification } from '@arco-design/web-vue';

export default defineComponent({
  props: {
    editForm: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['refresh'],
  setup(props, { emit }) {
    const visible = ref(false);
    const formRef = ref<InstanceType<typeof Form>>();
    const title = ref('添加角色');
    const form = ref({
      name: '',
      description: '',
    });
    const editId = ref('');

    const rules: { [k: string]: FieldRule[] } = {
      name: [{ required: true, message: '请输入角色名称' }],
      description: [{ required: true, message: '请输入角色KEY' }],
    };

    const show = () => {
      visible.value = true;
    };
    const cancel = () => {
      formRef.value?.clearValidate();
      formRef.value?.resetFields();
      visible.value = false;
      editId.value = '';
    };
    const changeTitle = (e) => {
      title.value = e;
    };
    const fillForm = (val) => {
      formRef.value?.setFields({
        name: { value: val.title },
        description: { value: val.key },
      });
      editId.value = val.id;
    };

    const handleBeforeOk = (done) => {
      formRef.value?.validate((errors) => {
        if (!errors) {
          const isAdd = title.value === '添加角色';
          (isAdd
            ? addRole(form.value)
            : editRole({ ...form.value, id: editId.value })
          ).then(() => {
            Notification.success({
              title: isAdd ? '添加成功' : '修改成功',
            });
            done(true);
            cancel();
            emit('refresh');
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
      title,
      fillForm,
      changeTitle,
      show,
      handleBeforeOk,
      cancel,
    };
  },
});
</script>

<style scoped></style>
