<template>
  <a-card class="general-card" title="用户查询">
    <a-row>
      <a-col :flex="1">
        <a-form
          :model="formModel"
          :label-col-props="{ span: 6 }"
          :wrapper-col-props="{ span: 18 }"
          label-align="left"
        >
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item field="blurry" label="用户帐号">
                <a-input
                  v-model="formModel.blurry"
                  placeholder="请输入用户帐号或邮箱"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 84px" direction="vertical" />
      <a-col :flex="'86px'" style="text-align: right">
        <a-space direction="vertical" :size="18">
          <a-button type="primary" @click="getUserList">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button @click="reset">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider />

    <a-row>
      <a-col :span="16">
        <a-space>
          <a-button type="primary" @click="createData">
            <template #icon>
              <icon-plus />
            </template>
            创建
          </a-button>
        </a-space>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :data="renderData"
      :loading="loading"
      :pagination="pagination"
      :bordered="false"
      style="margin-top: 20px"
      row-key="id"
      @page-change="onPageChange"
    >
      <template #username="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.username" />
        <p v-else>{{ record.username }}</p>
      </template>
      <template #nickName="{ record, rowIndex }">
        <a-select
          v-if="rowIndex === editIndex"
          v-model="record.nickName"
          :options="rolesOptions"
          @change="(e) => (record.nickName = e)"
        />
        <p v-else>
          {{ findLabel(record.nickName) }}
        </p>
      </template>
      <template #phone="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.phone" />
        <p v-else>{{ record.phone }}</p>
      </template>
      <template #email="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.email" />
        <p v-else>{{ record.email }}</p>
      </template>
      <template #optional="{ record, rowIndex }">
        <a-space :size="5">
          <a-button
            v-if="rowIndex !== editIndex"
            :disabled="editIndex !== -1"
            type="text"
            @click="changeEditIndex(rowIndex)"
          >
            编辑
          </a-button>
          <a-button
            v-else
            type="text"
            status="success"
            @click="saveEdit(record, rowIndex)"
          >
            完成
          </a-button>
          <a-popconfirm
            content="您确定要删除吗?"
            @ok="deleteFun(record, rowIndex)"
          >
            <a-button
              type="text"
              status="danger"
              :disabled="isSameName(record.username)"
            >
              删除
            </a-button>
          </a-popconfirm>
          <a-button
            type="text"
            status="warning"
            :disabled="isSameName(record.username)"
            @click="resetPasswordFun(record, rowIndex)"
          >
            重置密码
          </a-button>
        </a-space>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { Pagination } from '@/types/global';
import { addUser, deleteUser, editUser, getUsers, resetPwd } from '@/api/user';
import { Notification } from '@arco-design/web-vue';
import useUserStore from '../../../../store/modules/user';

const generateFormModel = () => {
  return {
    blurry: '',
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());
    const { loading, setLoading } = useLoading(true); // 这里应该是true
    const editIndex = ref(-1);
    const userStore = useUserStore();
    const rolesOptions = computed(() => [
      {
        label: '后台管理员',
        value: 'super_admin',
      },
      {
        label: '前台管理员',
        value: 'admin',
      },
      {
        label: '普通用户',
        value: 'user',
      },
    ]);
    const columns = [
      {
        title: '用户帐号',
        dataIndex: 'username',
        slotName: 'username',
      },
      {
        title: '用户角色',
        dataIndex: 'nickName',
        slotName: 'nickName',
      },
      {
        title: '电话',
        dataIndex: 'phone',
        slotName: 'phone',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        slotName: 'email',
      },
      {
        title: '操作',
        slotName: 'optional',
      },
    ];
    const renderData = ref([]);
    const basePagination: Pagination = {
      current: 1,
      pageSize: 10,
    };
    const pagination = reactive({
      ...basePagination,
    });

    const reset = () => {
      formModel.value = generateFormModel();
    };

    const findLabel = (value: string) => {
      const findItem = rolesOptions.value.find((item) => item.value === value);
      return findItem?.label || value;
    };
    const isSameName = (name) => {
      return userStore.userInfo.username === name;
    };

    const changeEditIndex = (n) => {
      editIndex.value = n;
    };

    const createData = () => {
      editIndex.value = 0;
      renderData.value.unshift({});
    };

    const getUserList = (params = {}) => {
      const query = {
        page: basePagination.current,
        size: basePagination.pageSize,
        ...params,
        ...formModel.value,
        sort: 'id',
      };
      setLoading(true);
      getUsers(query).then((res) => {
        setLoading(false);
        renderData.value = res.content;
        pagination.current = params.page;
        pagination.total = res.totalElements;
      });
    };

    const saveEdit = (record) => {
      if (Object.values(record).length < 4) {
        Notification.error('请填写完整信息');
        return;
      }
      const query = {
        ...record,
        dept: { id: 7 },
        enabled: true,
        gender: '男',
        jobs: [{ id: 11 }],
        roles: [{ id: 1 }],
      };
      // 没有id为添加，有id为修改
      (!record.id ? addUser(query) : editUser(query)).then(() => {
        editIndex.value = -1; // 清空编辑状态
        Notification.success({
          title: '成功',
          content: !record.id ? '添加成功' : '修改成功',
        });
        getUserList();
      });
    };
    const deleteFun = (record, rowIndex) => {
      // 数据没有id，直接删除
      if (!record.id) {
        renderData.value.splice(rowIndex, 1);
        editIndex.value = -1;
        return;
      }
      deleteUser([record.id]).then(() => {
        editIndex.value = -1;
        Notification.success({
          title: '成功',
          content: '删除成功',
        });
        getUserList();
      });
    };

    const resetPasswordFun = (record) => {
      resetPwd([record.id]).then(() => {
        Notification.success({
          title: '成功',
          content: '重置成功',
        });
      });
    };

    const onPageChange = (current: number) => {
      getUserList({ ...basePagination, current });
    };

    onMounted(() => {
      getUserList();
    });

    return {
      loading,
      columns,
      renderData,
      editIndex,
      pagination,
      rolesOptions,
      formModel,
      findLabel,
      isSameName,
      changeEditIndex,
      saveEdit,
      onPageChange,
      createData,
      getUserList,
      reset,
      deleteFun,
      resetPasswordFun,
    };
  },
});
</script>

<style scoped></style>
