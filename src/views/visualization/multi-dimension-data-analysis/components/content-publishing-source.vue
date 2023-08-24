<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" title="天车作业分布">
      <Chart style="width: 100%; height: 300px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  setup() {
    const loadData = ref([1111, 2222, 3333]);
    const pourData = ref([1000, 2000, 3000]);
    const preLoadData = ref([100, 200, 300]);

    const { chartOption } = useChartOption((isDark) => {
      const graphicElementStyle = {
        textAlign: 'center',
        fill: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
        fontSize: 14,
        lineWidth: 10,
        fontWeight: 'bold',
      };
      return {
        legend: {
          left: 'center',
          data: ['1号天车', '2号天车', '3号天车'],
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          textStyle: {
            color: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
          },
          itemStyle: {
            borderWidth: 0,
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '9.6%',
              top: 'center',
              style: {
                text: '装车吨数',
                ...graphicElementStyle,
              },
            },
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: '倒料吨数',
                ...graphicElementStyle,
              },
            },
            {
              type: 'text',
              left: '86.6%',
              top: 'center',
              style: {
                text: '预装吨数',
                ...graphicElementStyle,
              },
            },
          ],
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['11%', '50%'],
            label: {
              formatter: '{d}% ',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
              borderColor: isDark ? '#000' : '#fff',
              borderWidth: 1,
            },
            data: [
              {
                value: loadData.value[0],
                name: '1号天车',
                itemStyle: {
                  color: '#249EFF',
                },
              },
              {
                value: loadData.value[1],
                name: '2号天车',
                itemStyle: {
                  color: '#846BCE',
                },
              },
              {
                value: loadData.value[2],
                name: '3号天车',
                itemStyle: {
                  color: '#86DF6C',
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            label: {
              formatter: '{d}% ',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
              borderColor: isDark ? '#000' : '#fff',
              borderWidth: 1,
            },
            data: [
              {
                value: pourData.value[0],
                name: '1号天车',
                itemStyle: {
                  color: '#249EFF',
                },
              },
              {
                value: pourData.value[1],
                name: '2号天车',
                itemStyle: {
                  color: '#846BCE',
                },
              },
              {
                value: pourData.value[2],
                name: '3号天车',
                itemStyle: {
                  color: '#86DF6C',
                },
              },
            ],
          },
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['88%', '50%'],
            label: {
              formatter: '{d}% ',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
              borderColor: isDark ? '#000' : '#fff',
              borderWidth: 1,
            },
            data: [
              {
                value: preLoadData.value[0],
                name: '1号天车',
                itemStyle: {
                  color: '#249EFF',
                },
              },
              {
                value: preLoadData.value[1],
                name: '2号天车',
                itemStyle: {
                  color: '#846BCE',
                },
              },
              {
                value: preLoadData.value[2],
                name: '3号天车',
                itemStyle: {
                  color: '#86DF6C',
                },
              },
            ],
          },
        ],
      };
    });
    const { loading } = useLoading(false);
    return {
      chartOption,
      loading,
    };
  },
});
</script>

<style scoped lang="less"></style>
