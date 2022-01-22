import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.css'],
})
export class CompareComponent {
  // TODO: implement calculating logic for historic data;

  @Input() public data!: any[];
  @Input() public unit!: string;
  public readonly missingMsg: string = 'zu wenig Daten...';
  public compareMonthAbs!: number;
  public isMissingMonthAbs = true;
  public compareMonthRel!: number;
  public isMissingMonthRel = true;
  public compareYearAbs!: number;
  public isMissingYearAbs = true;
  public compareYearRel!: number;
  public isMissingYearRel = true;
}
