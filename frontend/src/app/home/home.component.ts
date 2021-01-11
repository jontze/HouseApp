import { Component, OnInit } from '@angular/core';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';
import { ChartSettingsI } from './chart/classes/chart';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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

  constructor(private apiBackendService: ApiBackendService) { }

  ngOnInit(): void {
    this.apiBackendService.getOil().subscribe((data) => this.allOil = data);
    this.apiBackendService.getPower().subscribe((data) => this.allPower = data);
    this.apiBackendService.getWater().subscribe((data) => this.allWater = data);
  }
}
