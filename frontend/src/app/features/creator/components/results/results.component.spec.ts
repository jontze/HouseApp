import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IResults } from './results';

import { ResultsComponent } from './results.component';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  let testData: IResults = {
    id: 1,
    date: new Date().toISOString(),
    createdAt: new Date(),
    updatedAt: new Date(),
    kwh: 123,
  };
  let testType: 'OIL' | 'WATER' | 'POWER' = 'OIL';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set resultData property', () => {
    fixture.componentInstance.resultData = testData;
    fixture.detectChanges();
    expect(fixture.componentInstance.resultData).toEqual(testData);
    fixture.componentInstance.resultData = undefined;
    fixture.detectChanges();
  });

  it('should set type property', () => {
    fixture.componentInstance.type = testType;
    fixture.detectChanges();
    expect(fixture.componentInstance.type).toEqual(testType);
    fixture.componentInstance.type = undefined;
    fixture.detectChanges();
  });
});
