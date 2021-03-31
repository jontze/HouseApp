import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartComponent } from './ngx-chart.component';

describe('NgxChartComponent', () => {
  let component: NgxChartComponent;
  let fixture: ComponentFixture<NgxChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxChartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud format date to locale string', () => {
    const dateNumber = new Date().getTime();
    const parsedDate = component.dateFormatting(dateNumber);
    expect(parsedDate).toBe(
      new Date(dateNumber).toLocaleString('de-DE', {
        month: 'short',
        day: 'numeric',
        year: '2-digit',
      })
    );
  });
});
