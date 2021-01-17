import { Component, OnInit } from '@angular/core';

import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';
import { ChartSettingsI } from './chart/classes/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public allOil!: Oil[];
  public allPower!: Power[];
  public allWater!: Water[];
  public readonly oilChartSettings: ChartSettingsI[] = [
    {
      dateFieldName: 'date',
      valueFieldName: 'filled',
      label: 'Ölstand',
    }
  ];
  public readonly powerChartSettings: ChartSettingsI[] = [
    {
      dateFieldName: 'date',
      valueFieldName: 'kwh',
      label: 'Stromverbrauch (KWh)'
    }
  ];
  public readonly waterChartSettings: ChartSettingsI[] = [
    {
      dateFieldName: 'date',
      valueFieldName: 'cubicmeter',
      label: 'Wasserverbrauch (m³)'
    }
  ];

  constructor(private readonly apiBackendService: ApiBackendService) { }

  ngOnInit(): void {
    this.loadOil();
    this.loadPower();
    this.loadWater();
  }

  public loadOil(): void {
    this.apiBackendService.getOil().subscribe((data) => this.allOil = data);
  }

  public loadPower(): void {
    this.apiBackendService.getPower().subscribe((data) => this.allPower = data);
  }

  public loadWater(): void {
    this.apiBackendService.getWater().subscribe((data) => this.allWater = data);
  }
}
