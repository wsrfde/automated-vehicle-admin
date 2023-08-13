<template>
  <a-card class="general-card" title="用户角色">
    <a-button type="primary" size="small" class="add-button" @click="addData">
      <template #icon>
        <icon-plus />
      </template>
      添加
    </a-button>

    <a-tree :data="treeData" show-line class="custom-tree">
      <template #switcher-icon> - </template>
      <template #extra="nodeData">
        <icon-edit class="icon-style" @click="editData(nodeData)" />
        <a-popconfirm content="您确定要删除吗?" @ok="deleteData(nodeData)">
          <icon-delete class="icon-style" />
        </a-popconfirm>
      </template>
    </a-tree>
  </a-card>
  <change-roles-modal
    ref="changeRolesModalRef"
    :edit-form="editForm"
    @refresh="getRolesData"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { getRoles, deleteRole } from '@/api/user';
import { Notification } from '@arco-design/web-vue';
import ChangeRolesModal from './changeRolesModal.vue';

export default defineComponent({
  components: { ChangeRolesModal },
  setup() {
    const page = ref(0);
    const pageSize = ref(99); // 角色不会有很多的
    const treeData = ref([]);
    const editForm = ref({});
    const changeRolesModalRef = ref<InstanceType<typeof ChangeRolesModal>>();

    function editData(nodeData) {
      // editForm.value = nodeData;
      changeRolesModalRef.value?.changeTitle('修改角色');
      changeRolesModalRef.value?.show();
      changeRolesModalRef.value?.fillForm(nodeData);
    }
    const addData = () => {
      changeRolesModalRef.value?.changeTitle('添加角色');
      changeRolesModalRef.value?.show();
    };

    function getRolesData() {
      const query = {
        page: page.value,
        size: pageSize.value,
      };
      getRoles(query).then((res) => {
        treeData.value = res.content.map((item) => ({
          title: item.name,
          key: item.description,
          id: item.id,
        }));
      });
    }

    function deleteData(nodeData) {
      deleteRole([nodeData.id]).then(() => {
        Notification.success({
          title: '删除成功',
        });
        getRolesData();
      });
    }

    onMounted(() => {
      getRolesData();
    });

    return {
      treeData,
      changeRolesModalRef,
      editForm,
      deleteData,
      editData,
      addData,
      getRolesData,
    };
  },
});
</script>

<style scoped lang="less">
.add-button {
  margin-bottom: 10px;
}
.custom-tree {
  .icon-style {
    position: absolute;
    font-size: 14px;
    top: 8px;
    color: #3370ff;
    &:nth-of-type(1) {
      right: 30px;
    }
    &:nth-of-type(2) {
      right: 8px;
    }
  }
}
</style>
