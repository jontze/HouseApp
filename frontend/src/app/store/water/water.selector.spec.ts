import { Water } from 'src/app/core/services/classes/api-backend';
import { selectWaterChartData, selectWaterCollection } from './water.selector';

describe('Water Selector', () => {
  let waterState: Water[];

  beforeEach(() => {
    waterState = [
      {
        id: 1,
        date: new Date().toISOString(),
        cubicmeter: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        date: new Date().toISOString(),
        cubicmeter: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        date: new Date().toISOString(),
        cubicmeter: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  it('should select water list', () => {
    const result = selectWaterCollection.projector(waterState);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[0].date).toBeDefined();
    expect(result[0].cubicmeter).toBe(100);
    expect(result[0].createdAt).toBeDefined();
    expect(result[0].updatedAt).toBeDefined();
  });

  it('should select water list as chart data', () => {
    const result = selectWaterChartData.projector(waterState);
    expect(result[0].name).toBe('m³');
    expect(result[0].series.length).toBe(3);
    expect(result[0].series[0].name).toBeDefined();
    expect(result[0].series[0].value).toBe(100);
  });
});
