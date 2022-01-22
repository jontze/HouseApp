import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Water } from 'src/app/core/services/classes/api-backend';
import { ChartDataI } from 'src/app/features/dashboard/models/line-charts';

const selectWaterList = createFeatureSelector<ReadonlyArray<Water>>('water');

export const selectWaterCollection = createSelector(
  selectWaterList,
  (waterState) => waterState
);

export const selectWaterChartData = createSelector(
  selectWaterList,
  (waterState) => {
    const chartData: ChartDataI = {
      name: 'm³',
      series: [],
    };
    waterState.forEach((water) => {
      chartData.series.push({
        value: water.cubicmeter,
        name: Date.parse(water.date),
      });
    });
    return [chartData];
  }
);
