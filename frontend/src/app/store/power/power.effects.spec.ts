import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { fetchPowerList } from './power.action';
import { PowerEffects } from './power.effects';

describe('Power Effects', () => {
  let effects: PowerEffects;
  let actions$: Observable<Action>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(() => {
    actions$ = new Observable();
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'fetchPower',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideMockActions(() => actions$),
        {
          provide: ApiBackendService,
          useValue: mockApiBackendService,
        },
      ],
    });

    effects = TestBed.inject(PowerEffects);
  });

  it('should load power list from backend', () => {
    actions$ = of(fetchPowerList);
    mockApiBackendService.fetchPower.and.returnValue(of());
    effects.loadOil$.subscribe();
    expect(mockApiBackendService.fetchPower).toHaveBeenCalled();
  });
});
