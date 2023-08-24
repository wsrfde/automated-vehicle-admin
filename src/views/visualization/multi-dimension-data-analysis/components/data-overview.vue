<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" title="装载量（吨）">
      <a-row justify="space-between">
        <a-col
          v-for="(item, idx) in renderData"
          :key="idx"
          :span="8"
          style="margin-bottom: 15px"
        >
          <a-statistic
            :title="item.title"
            :value="item.value"
            show-group-separator
            :value-from="0"
            animation
          >
            <template #prefix>
              <span
                class="statistic-prefix"
                :style="{ background: item.prefix.background }"
              >
                <component
                  :is="item.prefix.icon"
                  :style="{ color: item.prefix.iconColor }"
                />
              </span>
            </template>
          </a-statistic>
        </a-col>
      </a-row>
      <Chart style="height: 328px; margin-top: 20px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { LineSeriesOption } from 'echarts';
import useLoading from '@/hooks/loading';
import { ToolTipFormatterParams } from '@/types/echarts';
import useChartOption from '@/hooks/chart-option';
import dayjs from 'dayjs';
import { getStatistics } from '@/api/visualization';

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
  return items
    .map(
      (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${
            el.color
          }" class="tooltip-item-icon"></span>
          <span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`
    )
    .reverse()
    .join('');
};

const generateSeries = (
  name: string,
  lineColor: string,
  itemBorderColor: string,
  data: number[]
): LineSeriesOption => {
  return {
    name,
    data,
    stack: 'Total', // 数据堆叠，如果不需要可以去掉
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 10,
    itemStyle: {
      color: lineColor,
    },
    emphasis: {
      focus: 'series',
      itemStyle: {
        color: lineColor,
        borderWidth: 2,
        borderColor: itemBorderColor,
      },
    },
    lineStyle: {
      width: 2,
      color: lineColor,
    },
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
      color: lineColor,
    },
  };
};
export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const oneCarLoad = ref<number[]>([]);
    const twoCarLoad = ref<number[]>([]);
    const threeCarLoad = ref<number[]>([]);
    const oneCarPour = ref<number[]>([]);
    const twoCarPour = ref<number[]>([]);
    const threeCarPour = ref<number[]>([]);
    const xAxis = ref<string[]>([]);
    // 按照今日日期，往后排七天
    xAxis.value = new Array(7)
      .fill(0)
      .map((_item, index) => {
        const currentDate = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000;
        return dayjs(currentDate - oneDay * index).format('MM.DD');
      })
      .reverse();

    const lastValue = (arr: number[]) => {
      return arr[arr.length - 1];
    };

    const renderData = computed(() => [
      {
        title: '1号天车装车',
        value: lastValue(oneCarLoad.value),
        prefix: {
          icon: 'icon-archive',
          background: '#FFE4BA',
          iconColor: '#F77234',
        },
      },
      {
        title: '2号天车装车',
        value: lastValue(twoCarLoad.value),
        prefix: {
          icon: 'icon-archive',
          background: '#E8FFFB',
          iconColor: '#33D1C9',
        },
      },
      {
        title: '3号天车装车',
        value: lastValue(threeCarLoad.value),
        prefix: {
          icon: 'icon-archive',
          background: '#E8F3FF',
          iconColor: '#165DFF',
        },
      },
      {
        title: '1号天车倒料',
        value: lastValue(oneCarPour.value),
        prefix: {
          icon: 'icon-bg-colors',
          background: '#ffe5d4',
          iconColor: '#e87231',
        },
      },
      {
        title: '2号天车倒料',
        value: lastValue(twoCarPour.value),
        prefix: {
          icon: 'icon-bg-colors',
          background: '#b5eed1',
          iconColor: '#04ab60',
        },
      },
      {
        title: '3号天车倒料',
        value: lastValue(threeCarPour.value),
        prefix: {
          icon: 'icon-bg-colors',
          background: '#cbe9ff',
          iconColor: '#1577c0',
        },
      },
    ]);

    const { chartOption } = useChartOption((dark) => {
      return {
        grid: {
          left: '2.6%',
          right: '4',
          top: '40',
          bottom: '40',
        },
        xAxis: {
          type: 'category',
          offset: 2,
          data: xAxis.value,
          boundaryGap: false,
          axisLabel: {
            color: '#4E5969',
            formatter(value: number, idx: number) {
              if (idx === 0) return '';
              if (idx === xAxis.value.length - 1) return '';
              return `${value}`;
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: '#23ADFF',
              width: 2,
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              return `${value / 1000}k`;
            },
          },
          splitLine: {
            lineStyle: {
              color: dark ? '#2E2E30' : '#F2F3F5',
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const [firstElement] = params as ToolTipFormatterParams[];
            return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
          },
          className: 'echarts-tooltip-diy',
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: '2.6%',
              bottom: '18',
              style: {
                text: xAxis.value[0],
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12,
              },
            },
            {
              type: 'text',
              right: '0',
              bottom: '18',
              style: {
                text: xAxis.value[xAxis.value.length - 1],
                textAlign: 'center',
                fill: '#4E5969',
                fontSize: 12,
              },
            },
          ],
        },
        series: [
          generateSeries('1号天车装车', '#F77234', '#FFE4BA', oneCarLoad.value),
          generateSeries('2号天车装车', '#33D1C9', '#E8FFFB', twoCarLoad.value),
          generateSeries(
            '3号天车装车',
            '#165DFF',
            '#E8F3FF',
            threeCarLoad.value
          ),
          generateSeries('1号天车倒料', '#e87231', '#ffe5d4', oneCarPour.value),
          generateSeries('2号天车倒料', '#04ab60', '#b5eed1', twoCarPour.value),
          generateSeries(
            '3号天车倒料',
            '#1577c0',
            '#cbe9ff',
            threeCarPour.value
          ),
        ],
      };
    });
    const fetchData = async () => {
      setLoading(true);
      try {
        const query = {
          dateFrom: `${xAxis.value[0]} 00:00:00`,
          dateTo: `${xAxis.value[xAxis.value.length - 1]} 23:59:59`,
        };
        const res = await getStatistics(query);
        // const { data } = await queryDataOverview();
        const data = [
          {
            name: '1号天车装车',
            value: [892, 3380, 3513, 2020, 2602, 1308, 3326],
          },
          {
            name: '2号天车装车',
            value: [2064, 3725, 2941, 3714, 1937, 3882, 3242],
          },
          {
            name: '3号天车装车',
            value: [2015, 3873, 1499, 2902, 1659, 3392, 3264],
          },
          {
            name: '1号天车倒料',
            value: [3456, 2117, 3697, 2889, 3380, 2117, 2420],
          },
          {
            name: '2号天车倒料',
            value: [3013, 1491, 3719, 3261, 1411, 1902, 3180],
          },
          {
            name: '3号天车倒料',
            value: [1455, 3891, 1804, 3774, 3486, 834, 992],
          },
        ];

        data.forEach((el) => {
          switch (el.name) {
            case '1号天车装车':
              oneCarLoad.value = el.value;
              break;
            case '2号天车装车':
              twoCarLoad.value = el.value;
              break;
            case '3号天车装车':
              threeCarLoad.value = el.value;
              break;
            case '1号天车倒料':
              oneCarPour.value = el.value;
              break;
            case '2号天车倒料':
              twoCarPour.value = el.value;
              break;
            case '3号天车倒料':
              threeCarPour.value = el.value;
              break;
            default:
              break;
          }
        });
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return {
      loading,
      renderData,
      chartOption,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-statistic) {
  .arco-statistic-title {
    color: rgb(var(--gray-10));
    font-weight: bold;
  }

  .arco-statistic-value {
    display: flex;
    align-items: center;
  }
}

.statistic-prefix {
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
  color: var(--color-white);
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  vertical-align: middle;
  border-radius: 6px;
}
</style>
