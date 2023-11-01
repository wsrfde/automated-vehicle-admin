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
                  <a-select v-model="formModel.craneNo" placeholder="请选择">
                    <a-option value="">全部</a-option>
                    <a-option value="1">1号天车</a-option>
                    <a-option value="2">2号天车</a-option>
                  </a-select>
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
                <a-form-item field="step" label="天车状态">
                  <a-select v-model="formModel.step" placeholder="请选择">
                    <a-option value="">全部</a-option>
                    <a-option :value="findOptionVal('装车')"> 装车 </a-option>
                    <a-option :value="findOptionVal('卸料')">卸料</a-option>
                    <a-option :value="findOptionVal('倒料')">倒料</a-option>
                  </a-select>
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
          </a-space>
        </a-col>
      </a-row>
      <a-divider />
      <a-row>
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="downloadExcel">
              <template #icon>
                <icon-arrow-fall />
              </template>
              下载
            </a-button>
          </a-space>
        </a-col>
      </a-row>

      <a-table
        :columns="columns"
        :data="renderData"
        :loading="loading"
        :bordered="false"
        style="margin-top: 20px"
        row-key="id"
        :summary="summary"
      >
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import useLoading from '@/hooks/loading';
import { getJobStatistics } from '@/api/crane';
import json2Excel from '@/utils/json2Excel';
import { CRANE_OPTION } from '@/utils/dictionary';

const generateFormModel = () => {
  return {
    craneNo: '',
    dateFrom: '',
    dateTo: '',
    step: '',
  };
};

export default defineComponent({
  setup() {
    const formModel = ref(generateFormModel());
    const renderData = ref<any[]>([]);
    const otherData = ref<any>({});
    const { loading, setLoading } = useLoading(false); // 这里应该是true
    const columns = [
      {
        title: '天车号',
        dataIndex: 'craneNo',
      },
      {
        title: '状态',
        dataIndex: 'step',
      },
      {
        title: '称重数量(吨)',
        dataIndex: 'totalInTon',
      },
      {
        title: '时间',
        dataIndex: 'datetime',
      },
    ];

    const findOptionVal = (title: string) => {
      return CRANE_OPTION.find((item) => item.title === title)?.value;
    };
    const getVehicleList = (params = {}) => {
      const query = {
        ...params,
        ...formModel.value,
      };
      setLoading(true);
      getJobStatistics(query).then((res: any) => {
        setLoading(false);
        const { stats, ...data } = res;
        renderData.value = stats.map((item) => ({
          ...item,
          datetime: data?.datetime || '-',
        }));
        otherData.value = data;
      });
    };

    onMounted(() => {
      getVehicleList();
    });

    const summary = () => {
      return [
        {
          craneNo: '今日倒料统计',
          step:
            otherData.value.dailyStats && otherData.value.dailyStats[0]
              ? otherData.value.dailyStats[0]?.totalInTonDaily
              : '-',
          totalInTon: '今日装车统计',
          datetime:
            otherData.value.dailyStats && otherData.value.dailyStats[1]
              ? otherData.value.dailyStats[1]?.totalInTonDaily
              : '-',
        },
        {
          craneNo: '本月倒料统计',
          step:
            otherData.value.monthlyStats && otherData.value.monthlyStats[0]
              ? otherData.value.monthlyStats[0]?.totalInTonMonthly
              : '-',
          totalInTon: '本月装车统计',
          datetime:
            otherData.value.monthlyStats && otherData.value.monthlyStats[1]
              ? otherData.value.monthlyStats[1]?.totalInTonMonthly
              : '-',
        },
      ];
    };

    const findTitle = (key: string) => {
      const findItem = columns.find((item) => item.dataIndex === key);
      return findItem?.title;
    };

    const downloadExcel = () => {
      const data = [...renderData.value, ...summary()].map((item) => {
        const newItem: any = {};
        Object.keys(item).forEach((key) => {
          newItem[findTitle(key) ?? 0] = item[key];
        });
        return newItem;
      });
      json2Excel('工作统计.xlsx', data);
    };

    const dateChange = (dateString) => {
      if (!dateString) {
        formModel.value.dateFrom = '';
        formModel.value.dateTo = '';
        return;
      }
      const [dateFrom, dateTo] = dateString;
      formModel.value.dateFrom = `${dateFrom} 00:00:00`;
      formModel.value.dateTo = `${dateTo} 23:59:59`;
    };

    return {
      loading,
      columns,
      renderData,
      formModel,
      findOptionVal,
      getVehicleList,
      dateChange,
      summary,
      downloadExcel,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
