import { Component, OnInit, Inject, NgZone, PLATFORM_ID, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ChartSettingsI } from './classes/chart';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public chartId!: string;
  @Input() public settings: ChartSettingsI[] = [];
  private chartData!: [];

  private chart!: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) { }

  @Input() set data(chartData: any) {
    this.chartData = chartData;
    if (this.chart !== undefined) {
      this.reloadChartData(chartData);
    }
  }

  get data(): any {
    return this.chartData;
  }

  ngOnInit(): void {
  }

  // Run the function only in the browser
  browserOnly(f: () => void): void {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit(): void {
    this.browserOnly(() => {
      this.createChart();
    });
  }

  ngOnDestroy(): void {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  private createChart(): void {
    // Create Base Chart
    am4core.useTheme(am4themes_animated);
    this.chart = am4core.create(this.chartId, am4charts.XYChart);
    this.chart.logo.disabled = true;
    this.chart.paddingRight = 20;

    // Create Data Export Option
    this.chart.exporting.menu = new am4core.ExportMenu();
    this.chart.exporting.menu.align = 'right';
    this.chart.exporting.menu.verticalAlign = 'bottom';

    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.minWidth = 35;

    this.chart.cursor = new am4charts.XYCursor();
  }

  private reloadChartData(data: any): void {
    // Create Scrollbar
    const scrollbarX = new am4charts.XYChartScrollbar();
    this.chart.scrollbarX = scrollbarX;
    // Give Data to Chart
    this.chart.data = this.data;
    // Create Series based on given settings
    this.settings.forEach(setting => {
      const serie = this.chart.series.push(new am4charts.LineSeries());
      serie.dataFields.dateX = setting.dateFieldName;
      serie.dataFields.valueY = setting.valueFieldName;
      serie.name = setting.label;
      serie.tooltipText = `${setting.label}: [bold] {valueY}[/]`;
      serie.strokeWidth = 2;
      serie.tensionX = 0.7;
      scrollbarX.series.push(serie);
    });
  }
}
