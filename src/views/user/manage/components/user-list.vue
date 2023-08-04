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
              <a-form-item field="number" label="用户昵称">
                <a-input v-model="formModel.name" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="name" label="手机号码">
                <a-input v-model="formModel.number" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="contentType" label="用户角色">
                <a-select
                  v-model="formModel.contentType"
                  :options="rolesOptions"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider style="height: 84px" direction="vertical" />
      <a-col :flex="'86px'" style="text-align: right">
        <a-space direction="vertical" :size="18">
          <a-button type="primary" @click="search">
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
      <template #role="{ record, rowIndex }">
        <a-select
          v-if="rowIndex === editIndex"
          v-model="record.role"
          @change="(e) => (record.role = e)"
        >
          <a-option v-for="value of options" :key="value">
            {{ value }}
          </a-option>
        </a-select>
        <p v-else>{{ record.role }}</p>
      </template>
      <template #name="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.name" />
        <p v-else>{{ record.name }}</p>
      </template>
      <template #phone="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.phone" />
        <p v-else>{{ record.phone }}</p>
      </template>
      <template #password="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.password" />
        <p v-else>{{ record.password }}</p>
      </template>
      <template #email="{ record, rowIndex }">
        <a-input v-if="rowIndex === editIndex" v-model="record.email" />
        <p v-else>{{ record.email }}</p>
      </template>
      <template #optional="{ record, rowIndex }">
        <a-space>
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
            @ok="deleteUser(record, rowIndex)"
          >
            <a-button type="text" status="danger"> 删除 </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import useLoading from '@/hooks/loading';
import { roles } from '@/router/typings';
import { Options, Pagination } from '@/types/global';

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());
    const rolesOptions = computed<Options[]>(() => [
      {
        label: '后台管理员',
        value: 'superAdmin',
      },
      {
        label: '前台管理员',
        value: 'admin',
      },
      {
        label: '操作员',
        value: 'user',
      },
    ]);

    const search = () => {
      // fetchData({
      //   ...basePagination,
      //   ...formModel.value,
      // } as unknown as PolicyParams);
    };
    const reset = () => {
      formModel.value = generateFormModel();
    };

    const { loading, setLoading } = useLoading(false); // 这里应该是true
    const options: roles[] = ['superAdmin', 'admin', 'user'];

    const editIndex = ref(-1);

    const columns = [
      {
        title: '用户昵称',
        dataIndex: 'name',
        slotName: 'name',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
        slotName: 'phone',
      },
      {
        title: '登入密码',
        dataIndex: 'password',
        slotName: 'password',
      },
      {
        title: '用户角色',
        dataIndex: 'role',
        slotName: 'role',
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

    const renderData = reactive([
      {
        key: '1',
        role: 'superAdmin',
        name: '阿明',
        phone: '15122223333',
        password: '123456',
        email: 'jane.doe@example.com',
      },
      {
        key: '2',
        role: 'admin',
        name: '阿光',
        phone: '15123333333',
        password: '123456',
        email: 'alisa.ross@example.com',
      },
      {
        key: '3',
        role: 'user',
        name: '阿强',
        phone: '15223333333',
        password: '123456',
        email: 'qqq.ross@example.com',
      },
    ]);
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const changeEditIndex = (n) => {
      editIndex.value = n;
    };
    const saveEdit = (record, rowIndex) => {
      editIndex.value = -1; // 清空编辑状态
      console.log(record, rowIndex);
    };
    const deleteUser = (record, rowIndex) => {
      console.log(record, rowIndex);
    };

    const createData = () => {
      editIndex.value = 0;
      renderData.unshift({});
    };

    const fetchData = async (params = { current: 1, pageSize: 20 }) => {
      setLoading(true);
      try {
        console.log(params);
        // const { data } = await queryPolicyList(params);
        // renderData.value = data.list;
        // pagination.current = params.current;
        // pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const onPageChange = (current: number) => {
      fetchData({ ...basePagination, current });
    };

    return {
      loading,
      columns,
      renderData,
      options,
      editIndex,
      pagination,
      rolesOptions,
      formModel,
      changeEditIndex,
      saveEdit,
      onPageChange,
      createData,
      search,
      reset,
      deleteUser,
    };
  },
});
</script>

<style scoped></style>
