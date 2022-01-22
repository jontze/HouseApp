import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Oil } from 'src/app/core/services/classes/api-backend';

import { OilFormComponent } from './oil-form.component';

describe('OilFormComponent', () => {
  let component: OilFormComponent;
  let fixture: ComponentFixture<OilFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OilFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OilFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit oil event', () => {
    const emitSpy = spyOn(component.submitOilEvent, 'emit');
    component.submitOil({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ filled: 1, date: 'test' });
  });

  it('should map oil data strem to resource stream', async () => {
    const mockData: Oil = {
      date: new Date().toISOString(),
      id: 1,
      filled: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    component.oil$ = of(mockData);
    const formData = await component.oilFormData$?.toPromise();
    expect(formData?.date).toBe(mockData.date);
    expect(formData?.id).toBe(mockData.id);
    expect(formData?.value).toBe(mockData.filled);
  });
});
