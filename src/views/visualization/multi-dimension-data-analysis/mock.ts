import Mock from 'mockjs';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { PostData } from '@/types/global';

setupMock({
  mock: true,
  setup() {
    Mock.mock(new RegExp('/api/data-chain-growth'), (params: PostData) => {
      const { quota } = JSON.parse(params.body);
      const getLineData = () => {
        return {
          xAxis: new Array(12).fill(0).map((_item, index) => `${index + 1}日`),
          data: {
            name: quota,
            value: new Array(12)
              .fill(0)
              .map(() => Mock.Random.natural(1000, 3000)),
          },
        };
      };
      return successResponseWrap({
        count: Mock.Random.natural(1000, 3000),
        growth: Mock.Random.float(20, 100, 2, 2),
        chartData: getLineData(),
      });
    });
    // v2
    Mock.mock(new RegExp('/api/data-overview'), () => {
      const generateLineData = (name: string) => {
        return {
          name,
          count: Mock.Random.natural(20, 2000),
          value: new Array(7).fill(0).map(() => Mock.Random.natural(800, 4000)),
        };
      };

      return successResponseWrap({
        data: [
          generateLineData('1号天车装车'),
          generateLineData('2号天车装车'),
          generateLineData('3号天车装车'),
          generateLineData('1号天车倒料'),
          generateLineData('2号天车倒料'),
          generateLineData('3号天车倒料'),
        ],
      });
    });
  },
});
