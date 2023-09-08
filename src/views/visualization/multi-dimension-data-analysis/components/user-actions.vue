<template>
  <a-card class="general-card" title="今日抓料统计（吨）">
    <Chart height="122px" :option="chartOption" />
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  props: {
    loadData: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const renderData = ref([]);
    watch(props.loadData, (val: any) => {
      renderData.value = val.map(
        (item: any) => item.value[item.value.length - 1]
      );
    });
    const { chartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: 52,
          right: 20,
          top: 0,
          bottom: 20,
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              return `${Number(value) / 1000}k`;
            },
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E8EF',
            },
          },
        },
        yAxis: {
          type: 'category',
          data: ['1号天车', '2号天车', '3号天车'],
          axisLabel: {
            show: true,
            color: '#4E5969',
          },
          axisTick: {
            show: true,
            length: 2,
            lineStyle: {
              color: '#A9AEB8',
            },
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#A9AEB8',
            },
          },
        },
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        series: [
          {
            data: renderData.value,
            type: 'bar',
            barWidth: 7,
            itemStyle: {
              color: '#4086FF',
              borderRadius: 4,
            },
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
