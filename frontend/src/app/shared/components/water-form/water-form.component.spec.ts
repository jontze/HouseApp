import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Water } from 'src/app/core/services/classes/api-backend';

import { WaterFormComponent } from './water-form.component';

describe('WaterFormComponent', () => {
  let component: WaterFormComponent;
  let fixture: ComponentFixture<WaterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaterFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit water event', () => {
    const emitSpy = spyOn(component.submitWaterEvent, 'emit');
    component.submitWater({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ cubicmeter: 1, date: 'test' });
  });

  it('should map water data strem to resource stream', async () => {
    const mockData: Water = {
      date: new Date().toISOString(),
      id: 1,
      cubicmeter: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    component.water$ = of(mockData);
    const formData = await component.waterFormData$?.toPromise();
    expect(formData?.date).toBe(mockData.date);
    expect(formData?.id).toBe(mockData.id);
    expect(formData?.value).toBe(mockData.cubicmeter);
  });
});
