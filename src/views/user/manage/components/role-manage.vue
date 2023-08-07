<template>
  <a-card class="general-card" title="用户角色">
    <a-button type="primary" size="small" class="add-button" @click="addData">
      <template #icon>
        <icon-plus />
      </template>
      添加
    </a-button>

    <a-tree v-model:checked-keys="checkedKeys" :data="treeData" show-line>
      <template #switcher-icon> - </template>
      <template #extra="nodeData">
        <icon-delete
          style="
            position: absolute;
            right: 8px;
            font-size: 12px;
            top: 10px;
            color: #3370ff;
          "
          @click="() => deleteData(nodeData)"
        />
      </template>
    </a-tree>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const checkedKeys = ref([]);

    const treeData = [
      {
        title: '后台管理员',
        key: 'superAdmin',
      },
      {
        title: '前台管理员',
        key: 'admin',
      },
      {
        title: '操作员',
        key: 'user',
      },
    ];

    function deleteData(nodeData) {
      console.log(nodeData);
    }
    const addData = () => {
      console.log('-----');
    };

    return {
      checkedKeys,
      treeData,
      deleteData,
      addData,
    };
  },
});
</script>

<style scoped lang="less">
.add-button {
  margin-bottom: 10px;
}
</style>
