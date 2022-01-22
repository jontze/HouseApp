import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Oil } from 'src/app/core/services/classes/api-backend';
import { ChartDataI } from 'src/app/features/dashboard/models/line-charts';

const selectOilList = createFeatureSelector<ReadonlyArray<Oil>>('oil');

export const selectOilCollection = createSelector(
  selectOilList,
  (oilState) => oilState
);

export const selectOilChartData = createSelector(selectOilList, (oilState) => {
  const chartData: ChartDataI = {
    name: 'Ölstand',
    series: [],
  };
  oilState.forEach((oil) => {
    chartData.series.push({
      value: oil.filled,
      name: Date.parse(oil.date),
    });
  });
  return [chartData];
});
