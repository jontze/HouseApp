import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IAlert } from '../../services/classes/alert';

import { AlertBoxComponent } from './alert-box.component';

describe('AlertBoxComponent', () => {
  let component: AlertBoxComponent;
  let fixture: ComponentFixture<AlertBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertBoxComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should identify alert by uuid', () => {
    const alert: IAlert = {
      uuid: '123',
      message: 'Test',
      type: 'success',
    };
    expect(component.identifyById(0, alert)).toBe(alert.uuid);
  });

  it('should receive alerts through input property', () => {
    const alert: IAlert = {
      uuid: '123',
      message: 'Test',
      type: 'success',
    };
    component.alerts = [alert, alert, alert];
    fixture.detectChanges();
    expect(component.alerts.length).toBe(3);
  });
});
