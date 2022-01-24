import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { fetchWaterList } from './water.action';
import { WaterEffects } from './water.effects';

describe('Water Effects', () => {
  let effects: WaterEffects;
  let actions$: Observable<Action>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(() => {
    actions$ = new Observable();
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'fetchWater',
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

    effects = TestBed.inject(WaterEffects);
  });

  it('should load water list from backend', () => {
    actions$ = of(fetchWaterList);
    mockApiBackendService.fetchWater.and.returnValue(of());
    effects.loadWater$.subscribe();
    expect(mockApiBackendService.fetchWater).toHaveBeenCalled();
  });
});
