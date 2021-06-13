import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { IAlert } from '../../services/classes/alert';

import { SkeletonComponent } from './skeleton.component';

describe('SkeletonComponent', () => {
  let component: SkeletonComponent;
  let fixture: ComponentFixture<SkeletonComponent>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  const dummyRemoveId: string = '123';
  const dummyAlert: IAlert = {
    uuid: dummyRemoveId,
    message: 'Test',
    type: 'success',
  };

  beforeEach(async () => {
    mockAlertService = jasmine.createSpyObj('AlertService', ['']);
    await TestBed.configureTestingModule({
      declarations: [SkeletonComponent],
      providers: [
        {
          provide: AlertService,
          useValue: mockAlertService,
        },
      ],
    }).compileComponents();

    // init mocks
    mockAlertService.alerts$ = new ReplaySubject(1);
    mockAlertService.removeAlert$ = new ReplaySubject(1);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component.alerts.length).toBe(0);
  });

  it('should add alert to array', () => {
    expect(component.alerts.length).toBe(0);
    mockAlertService.alerts$.next(dummyAlert);
    expect(component.alerts.length).toBe(1);
    expect(component.alerts[0].message).toBe(dummyAlert.message);
    expect(component.alerts[0].uuid).toBe(dummyAlert.uuid);
    expect(component.alerts[0].type).toBe(dummyAlert.type);
  });

  it('should remove alert from array', () => {
    expect(component.alerts.length).toBe(0);
    mockAlertService.alerts$.next(dummyAlert);
    expect(component.alerts.length).toBe(1);
    mockAlertService.removeAlert$.next(dummyRemoveId);
    expect(component.alerts.length).toBe(0);
  });
});
