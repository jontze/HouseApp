import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Water, WaterInput } from 'src/app/core/services/classes/api-backend';
import { deleteWaterById, fetchWaterList, updateWater } from './water.action';
import { WaterEffects } from './water.effects';

describe('Water Effects', () => {
  let effects: WaterEffects;
  let actions$: Observable<Action>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(() => {
    actions$ = new Observable();
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'fetchWater',
      'dropWaterById',
      'updateWaterById',
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

  it('should delete water', () => {
    const waterId = 123;
    actions$ = of(deleteWaterById({ id: waterId }));
    mockApiBackendService.dropWaterById.and.returnValue(of());
    effects.dropWaterById$.subscribe();
    expect(mockApiBackendService.dropWaterById).toHaveBeenCalledOnceWith(
      waterId
    );
  });

  it('should update water', () => {
    const waterId = 123;
    const waterInput: WaterInput = {
      date: '',
      cubicmeter: 100,
    };
    const waterResponse: Water = {
      id: 1,
      date: new Date().toISOString(),
      cubicmeter: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockApiBackendService.updateWaterById.and.returnValue(of(waterResponse));
    actions$ = of(updateWater({ id: waterId, input: waterInput }));
    effects.updateWater$.subscribe();
    expect(mockApiBackendService.updateWaterById).toHaveBeenCalledOnceWith(
      waterId,
      waterInput
    );
  });
});
