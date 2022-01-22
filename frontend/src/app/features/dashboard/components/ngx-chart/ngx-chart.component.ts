import { Component, Input, OnInit } from '@angular/core';
import { ChartDataI } from '../../models/line-charts';
import { IChartColorSchema } from '../../models/ngx-color-schema';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { Observable } from 'rxjs';

registerLocaleData(localeDe, localeDeExtra);

@Component({
  selector: 'app-ngx-chart',
  templateUrl: './ngx-chart.component.html',
  styleUrls: ['./ngx-chart.component.css'],
})
export class NgxChartComponent implements OnInit {
  @Input() data$?: Observable<ReadonlyArray<ChartDataI>>;
  @Input() xLabel: string = '';
  @Input() yLabel: string = '';
  @Input() showYLabel: boolean = true;
  @Input() showXLabel: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() yAxis: boolean = true;
  @Input() legend: boolean = true;
  @Input() showLabels: boolean = true;
  @Input() animations: boolean = true;
  @Input() timeline: boolean = false;
  @Input() colorSeries: string[] = [
    '#647c8a',
    '#3f51b5',
    '#2196f3',
    '#00b862',
    '#afdf0a',
    '#a7b61a',
    '#f3e562',
    '#ff9800',
    '#ff5722',
    '#ff4514',
  ];
  colorScheme?: IChartColorSchema;

  ngOnInit() {
    this.colorScheme = {
      name: 'vivid',
      selectable: true,
      group: 'Ordinal',
      domain: this.colorSeries,
    };
  }

  dateFormatting(val: number) {
    return new Date(val).toLocaleString('de-DE', {
      month: 'short',
      day: 'numeric',
      year: '2-digit',
    });
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
