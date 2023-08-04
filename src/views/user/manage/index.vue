<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '用户管理']" />
    <a-layout class="layout-box">
      <a-layout-sider class="sider-box" :width="200">
        <RoleManage />
      </a-layout-sider>
      <a-layout-content class="content-box">
        <UserList />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserList from './components/user-list.vue';
import RoleManage from './components/role-manage.vue';

export default defineComponent({
  components: { UserList, RoleManage },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
.layout-box {
  .sider-box {
    margin-right: 20px;
    background-color: var(--color-bg-2);
    border-radius: 4px;
    height: 80vh;
  }
  .content-box {
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }
}
</style>
