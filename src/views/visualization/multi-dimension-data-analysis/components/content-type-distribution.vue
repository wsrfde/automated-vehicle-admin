<template>
  <a-card
    class="general-card"
    title="抓料区域分布"
    :header-style="{ paddingBottom: 0 }"
  >
    <Chart style="height: 222px" :option="chartOption" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  setup() {
    const { chartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 20,
        },
        legend: {
          show: true,
          top: 'center',
          right: '0',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 20,
          textStyle: {
            color: isDark ? '#ffffff' : '#4E5969',
          },
        },
        radar: {
          center: ['40%', '50%'],
          radius: 80,
          indicator: [
            { name: 'A区', max: 6500 },
            { name: 'B区', max: 22000 },
            { name: 'C区', max: 30000 },
            { name: 'D区', max: 38000 },
            { name: 'E区', max: 52000 },
            { name: 'F区', max: 25000 },
          ],
          axisName: {
            color: isDark ? '#ffffff' : '#1D2129',
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E6EB',
            },
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E6EB',
            },
          },
          splitArea: {
            areaStyle: {
              color: [],
            },
          },
        },
        series: [
          {
            type: 'radar',
            areaStyle: {
              opacity: 0.2,
            },
            data: [
              {
                value: [4850, 19000, 19000, 29500, 35200, 20000],
                name: '今天',
                symbol: 'none',
                itemStyle: {
                  color: isDark ? '#6CAAF5' : '#249EFF',
                },
              },
              {
                value: [2250, 17000, 21000, 23500, 42950, 22000],
                name: '昨天',
                symbol: 'none',
                itemStyle: {
                  color: isDark ? '#A079DC' : '#313CA9',
                },
              },
            ],
          },
        ],
      };
    });

    return {
      chartOption,
    };
  },
});
</script>

<style scoped lang="less"></style>
