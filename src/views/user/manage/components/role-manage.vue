<template>
  <a-card class="general-card" title="用户角色">
    <a-tree v-model:checked-keys="checkedKeys" :data="treeData" show-line>
      <template #switcher-icon> - </template>
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

    return {
      checkedKeys,
      treeData,
    };
  },
});
</script>

<style scoped></style>
