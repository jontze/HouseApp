import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChartDataI } from 'src/app/features/dashboard/models/line-charts';
import { ApiBackendService } from './api-backend.service';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private readonly backendService: ApiBackendService) {}

  getPowerChartData(): Observable<ChartDataI[]> {
    return this.backendService.getPower().pipe(
      map((powerdata) => {
        const chartData: ChartDataI = {
          name: 'KW/h',
          series: [],
        };
        powerdata.forEach((power) => {
          chartData.series.push({
            value: power.kwh,
            name: Date.parse(power.date),
          });
        });
        return [chartData];
      })
    );
  }

  getOilChartData(): Observable<ChartDataI[]> {
    return this.backendService.getOil().pipe(
      map((oildata) => {
        const chartData: ChartDataI = {
          name: 'Ölstand',
          series: [],
        };
        oildata.forEach((oil) => {
          chartData.series.push({
            value: oil.filled,
            name: Date.parse(oil.date),
          });
        });
        return [chartData];
      })
    );
  }

  getWaterChartData(): Observable<ChartDataI[]> {
    return this.backendService.getWater().pipe(
      map((waterdata) => {
        const chartData: ChartDataI = {
          name: 'm³',
          series: [],
        };
        waterdata.forEach((water) => {
          chartData.series.push({
            value: water.cubicmeter,
            name: Date.parse(water.date),
          });
        });
        return [chartData];
      })
    );
  }
}
