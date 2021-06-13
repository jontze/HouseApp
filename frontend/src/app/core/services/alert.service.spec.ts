import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;
  let unsubscribe: Subject<unknown>;

  beforeEach(() => {
    unsubscribe = new Subject();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  afterEach(() => {
    unsubscribe.next();
    unsubscribe.complete();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should populate alert to observable', () => {
    service.addAlert('Test', 'success');
    service.alerts$.pipe(takeUntil(unsubscribe)).subscribe((alert) => {
      expect(alert.message).toBe('Test');
    });
  });

  it('should populate remove alertId to observable', () => {
    service.addAlert('Test', 'success', 0);
    service.alerts$.pipe(takeUntil(unsubscribe)).subscribe((alert) => {
      expect(alert.message).toBe('Test');
    });
    service.removeAlert$.pipe(takeUntil(unsubscribe)).subscribe((alertId) => {
      expect(alertId).toBeDefined();
    });
  });
});
