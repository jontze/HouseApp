import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Power, PowerInput } from 'src/app/core/services/classes/api-backend';
import { deletePowerById, fetchPowerList, updatePower } from './power.action';
import { PowerEffects } from './power.effects';

describe('Power Effects', () => {
  let effects: PowerEffects;
  let actions$: Observable<Action>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(() => {
    actions$ = new Observable();
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'fetchPower',
      'dropPowerById',
      'updatePowerById',
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
    effects.loadPower$.subscribe();
    expect(mockApiBackendService.fetchPower).toHaveBeenCalled();
  });

  it('should delete power', () => {
    const id = 123;
    actions$ = of(deletePowerById({ id }));
    mockApiBackendService.dropPowerById.and.returnValue(of());
    effects.dropPowerById$.subscribe();
    expect(mockApiBackendService.dropPowerById).toHaveBeenCalledOnceWith(id);
  });

  it('should update power', () => {
    const id = 123;
    const input: PowerInput = {
      date: '',
      kwh: 100,
    };
    const response: Power = {
      id: 1,
      date: new Date().toISOString(),
      kwh: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockApiBackendService.updatePowerById.and.returnValue(of(response));
    actions$ = of(updatePower({ id, input }));
    effects.updatePower$.subscribe();
    expect(mockApiBackendService.updatePowerById).toHaveBeenCalledOnceWith(
      id,
      input
    );
  });
});
