export interface ChartSeriesI {
  value: number;
  name: number;
}

export interface ChartDataI {
  name: string;
  series: ChartSeriesI[];
}
