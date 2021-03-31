import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartService } from 'src/app/core/services/chart.service';
import { ChartDataI } from '../models/line-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  public allOil: ChartDataI[] = [];
  public allPower: ChartDataI[] = [];
  public allWater: ChartDataI[] = [];

  constructor(private readonly chartService: ChartService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.chartService
        .getPowerChartData()
        .subscribe((powerChart) => (this.allPower = powerChart)),
      this.chartService
        .getOilChartData()
        .subscribe((oilChart) => (this.allOil = oilChart)),
      this.chartService
        .getWaterChartData()
        .subscribe((waterChart) => (this.allWater = waterChart))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
