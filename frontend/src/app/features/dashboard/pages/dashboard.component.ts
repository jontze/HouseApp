import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartDataI } from '../models/line-charts';
import { selectOilChartData } from 'src/app/store/oil/oil.selector';
import { selectPowerChartData } from 'src/app/store/power/power.selector';
import { selectWaterChartData } from 'src/app/store/water/water.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  public oil$: Observable<ReadonlyArray<ChartDataI>> =
    this.store.select(selectOilChartData);
  public power$: Observable<ReadonlyArray<ChartDataI>> =
    this.store.select(selectPowerChartData);
  public water$: Observable<ReadonlyArray<ChartDataI>> =
    this.store.select(selectWaterChartData);

  constructor(private readonly store: Store) {}
}
