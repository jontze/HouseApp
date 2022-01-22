import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Power } from 'src/app/core/services/classes/api-backend';

import { PowerFormComponent } from './power-form.component';

describe('PowerFormComponent', () => {
  let component: PowerFormComponent;
  let fixture: ComponentFixture<PowerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PowerFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit power event', () => {
    const emitSpy = spyOn(component.submitPowerEvent, 'emit');
    component.submitPower({ value: 1, date: 'test' });
    expect(emitSpy).toHaveBeenCalledWith({ kwh: 1, date: 'test' });
  });

  it('should map power data strem to resource stream', async () => {
    const mockData: Power = {
      date: new Date().toISOString(),
      id: 1,
      kwh: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    component.power$ = of(mockData);
    const formData = await component.powerFormData$?.toPromise();
    expect(formData?.date).toBe(mockData.date);
    expect(formData?.id).toBe(mockData.id);
    expect(formData?.value).toBe(mockData.kwh);
  });
});
