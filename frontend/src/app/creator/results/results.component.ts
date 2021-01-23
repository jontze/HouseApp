import { Component, Input, OnInit } from '@angular/core';
import { IResults } from './results';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  @Input() resultData?: IResults;

  constructor() {}

  ngOnInit(): void {}
}
