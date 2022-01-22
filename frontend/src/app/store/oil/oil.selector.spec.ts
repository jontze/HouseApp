import { Oil } from 'src/app/core/services/classes/api-backend';
import { selectOilChartData, selectOilCollection } from './oil.selector';

describe('Oil Selector', () => {
  let oilState: Oil[];

  beforeEach(() => {
    oilState = [
      {
        id: 1,
        date: new Date().toISOString(),
        filled: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        date: new Date().toISOString(),
        filled: 200,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        date: new Date().toISOString(),
        filled: 300,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  });

  it('should select oil list', () => {
    const result = selectOilCollection.projector(oilState);
    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[0].date).toBeDefined();
    expect(result[0].filled).toBe(100);
    expect(result[0].createdAt).toBeDefined();
    expect(result[0].updatedAt).toBeDefined();
  });

  it('should select oil list as chart data', () => {
    const result = selectOilChartData.projector(oilState);
    expect(result[0].name).toBe('Ölstand');
    expect(result[0].series.length).toBe(3);
    expect(result[0].series[0].name).toBeDefined();
    expect(result[0].series[0].value).toBe(100);
  });
});
