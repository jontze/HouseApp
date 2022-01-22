import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Power } from 'src/app/core/services/classes/api-backend';
import { ChartDataI } from 'src/app/features/dashboard/models/line-charts';

const selectPowerList = createFeatureSelector<ReadonlyArray<Power>>('power');

export const selectPowerCollection = createSelector(
  selectPowerList,
  (powerState) => powerState
);

export const selectPowerChartData = createSelector(
  selectPowerList,
  (powerState) => {
    const chartData: ChartDataI = {
      name: 'KW/h',
      series: [],
    };
    powerState.forEach((power) => {
      chartData.series.push({
        value: power.kwh,
        name: Date.parse(power.date),
      });
    });
    return [chartData];
  }
);
