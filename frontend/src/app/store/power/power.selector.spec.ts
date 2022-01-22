import { Power } from 'src/app/core/services/classes/api-backend';
import { selectPowerChartData, selectPowerCollection } from './power.selector';

describe('Power Selector', () => {
  let powerState: Power[];

  beforeEach(() => {
    powerState = [
      {
        id: 1,
        date: new Date().toISOString(),
        kwh: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        date: new Date().toISOString(),
        kwh: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        date: new Date().toISOString(),
        kwh: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  it('should select power list', () => {
    const result = selectPowerCollection.projector(powerState);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[0].date).toBeDefined();
    expect(result[0].kwh).toBe(100);
    expect(result[0].createdAt).toBeDefined();
    expect(result[0].updatedAt).toBeDefined();
  });

  it('should select power list as chart data', () => {
    const result = selectPowerChartData.projector(powerState);
    expect(result[0].name).toBe('KW/h');
    expect(result[0].series.length).toBe(3);
    expect(result[0].series[0].name).toBeDefined();
    expect(result[0].series[0].value).toBe(100);
  });
});
