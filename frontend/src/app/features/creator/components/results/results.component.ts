import { Component, Input, OnInit } from '@angular/core';
import { IResults } from './results';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';

registerLocaleData(localeDe, localeDeExtra);

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() resultData?: IResults;
  @Input() type?: 'OIL' | 'WATER' | 'POWER';

  constructor() {}

  ngOnInit(): void {}
}
