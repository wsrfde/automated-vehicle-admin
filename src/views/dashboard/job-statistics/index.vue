<template>
  <div class="container">
    <Breadcrumb :items="['仪表盘', '工作统计']" />
    <a-card class="general-card" title="工作统计">
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
                <a-form-item field="craneNo" label="行车编号">
                  <a-input v-model="formModel.craneNo" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="dateFrom" label="统计日期">
                  <a-range-picker
                    :placeholder="['开始日期', '结束日期']"
                    @change="dateChange"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="truckLicense" label="行车车牌">
                  <a-input
                    v-model="formModel.truckLicense"
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
            <a-button type="primary" @click="getVehicleList()">
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
      <!--:summary="summary"-->
      <a-table
        :columns="columns"
        :data="renderData"
        :loading="loading"
        :bordered="false"
        style="margin-top: 20px"
        row-key="id"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { getJobStatistics } from '@/api/dashboard';

const generateFormModel = () => {
  return {
    craneNo: '',
    dateFrom: '',
    dateTo: '',
    truckLicense: '',
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());

    const reset = () => {
      formModel.value = generateFormModel();
    };

    const { loading, setLoading } = useLoading(false); // 这里应该是true

    const columns = [
      {
        title: '统计名称',
        dataIndex: 'step',
      },
      {
        title: '总吨数',
        dataIndex: 'totalInTon',
      },
    ];

    const renderData = ref([]);

    const getVehicleList = (params = {}) => {
      const query = {
        ...params,
        ...formModel.value,
      };
      setLoading(true);
      getJobStatistics(query).then((res) => {
        setLoading(false);
        renderData.value = res;
      });
    };

    onMounted(() => {
      getVehicleList();
    });

    // const summary = ({ data }) => {
    // console.log('summary', data);
    // console.log(data[0]?.step);
    // return data.map((item) => {
    //   return {
    //     step: item.step,
    //     totalInTon: item.totalInTon,
    //   };
    // });
    // return [
    //   {
    //     step: data[0]?.step,
    //     totalInTon: 0,
    //   },
    //   {
    //     step: '月运输统计',
    //     totalInTon: 1,
    //   },
    // ];
    // };

    const dateChange = (dateString) => {
      const [dateFrom, dateTo] = dateString;
      formModel.value.dateFrom = dateFrom;
      formModel.value.dateTo = dateTo;
    };

    return {
      loading,
      columns,
      renderData,
      formModel,
      reset,
      getVehicleList,
      dateChange,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
