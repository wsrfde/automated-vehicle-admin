<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '用户管理']" />
    <a-layout class="layout-box">
      <a-layout-sider class="sider-box" :width="250">
        <RoleManage :roles-data="rolesData" @get-roles-data="getRolesData" />
      </a-layout-sider>
      <a-layout-content class="content-box">
        <UserList :roles-data="rolesData" />
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getRoles } from '@/api/user';
import UserList from './components/user-list.vue';
import RoleManage from './components/role-manage.vue';

export default defineComponent({
  components: { UserList, RoleManage },
  setup() {
    const rolesData = ref([]);
    function getRolesData(query) {
      console.log(query);
      getRoles(query).then((res) => {
        rolesData.value = res.content.map((item) => ({
          title: item.name,
          key: item.description,
          id: item.id,
        }));
      });
    }
    return {
      getRolesData,
      rolesData,
    };
  },
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
