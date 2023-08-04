<template>
  <div class="container">
    <Breadcrumb :items="['系统监控', '操作日志']" />
    <a-card class="general-card" title="操作日志">
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
                <a-form-item field="name" label="用户昵称">
                  <a-input v-model="formModel.name" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="number" label="手机号码">
                  <a-input v-model="formModel.number" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="time" label="操作日期">
                  <a-range-picker
                    v-model="formModel.time"
                    style="width: 100%"
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
        <template #action="{ record }">
          <a-tag :color="record.action === '紧急停止' ? 'red' : 'arcoblue'">
            {{ record.action }}
          </a-tag>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { Pagination } from '@/types/global';

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    time: [],
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());

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

    const columns = [
      {
        title: '用户昵称',
        dataIndex: 'name',
      },
      {
        title: '手机号码',
        dataIndex: 'phone',
      },
      {
        title: '执行动作',
        dataIndex: 'action',
        slotName: 'action',
      },
      {
        title: '操作日期',
        dataIndex: 'time',
      },
    ];

    const renderData = reactive([
      {
        key: '1',
        name: '阿明',
        phone: '15122223333',
        action: '紧急停止',
        time: '2023/8/2 11:18:38',
      },
      {
        key: '2',
        name: '阿光',
        phone: '15123333333',
        action: '车辆启动',
        time: '2023/8/1 20:18:38',
      },
    ]);
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });

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
      pagination,
      formModel,
      onPageChange,
      search,
      reset,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
