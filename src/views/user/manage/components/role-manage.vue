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
    @refresh="refresh"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType, ref } from 'vue';
import { deleteRole } from '@/api/user';
import { Notification } from '@arco-design/web-vue';
import { TreeNodeData } from '@arco-design/web-vue/es/tree/interface';
import ChangeRolesModal from './changeRolesModal.vue';

export default defineComponent({
  components: { ChangeRolesModal },
  props: {
    rolesData: {
      type: Array as PropType<TreeNodeData[]>,
      default: () => [],
    },
  },
  emits: ['getRolesData'],
  setup(props, { emit }) {
    const page = ref(0);
    const pageSize = ref(99); // 角色不会有很多的
    const treeData = computed(() => props.rolesData);
    const editForm = ref({});
    const query = {
      page: page.value,
      size: pageSize.value,
    };
    const changeRolesModalRef = ref<InstanceType<typeof ChangeRolesModal>>();

    function editData(nodeData) {
      changeRolesModalRef.value?.changeTitle('修改角色');
      changeRolesModalRef.value?.show();
      changeRolesModalRef.value?.fillForm(nodeData);
    }
    const addData = () => {
      changeRolesModalRef.value?.changeTitle('添加角色');
      changeRolesModalRef.value?.show();
    };

    const refresh = () => {
      emit('getRolesData', query);
    };

    function deleteData(nodeData) {
      deleteRole([nodeData.id]).then(() => {
        Notification.success({
          content: '删除成功',
        });
        emit('getRolesData', query);
      });
    }

    onMounted(() => {
      emit('getRolesData', query);
    });

    return {
      treeData,
      changeRolesModalRef,
      editForm,
      deleteData,
      editData,
      addData,
      refresh,
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
