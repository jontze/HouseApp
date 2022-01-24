import { TestBed } from '@angular/core/testing';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { OilEffects } from './oil.effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { deleteOilById, fetchOilList, updateOil } from './oil.action';
import { Oil, OilInput } from 'src/app/core/services/classes/api-backend';

describe('Oil effects', () => {
  let effects: OilEffects;
  let actions$: Observable<Action>;
  let mockApiBackendService: jasmine.SpyObj<ApiBackendService>;

  beforeEach(() => {
    actions$ = new Observable();
    mockApiBackendService = jasmine.createSpyObj('ApiBackendService', [
      'fetchOil',
      'dropOilById',
      'updateOilById',
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

    effects = TestBed.inject(OilEffects);
  });

  it('should fetch oil list from backend', () => {
    actions$ = of(fetchOilList);
    mockApiBackendService.fetchOil.and.returnValue(of());
    effects.loadOil$.subscribe();
    expect(mockApiBackendService.fetchOil).toHaveBeenCalledTimes(1);
  });

  it('should delete oil', () => {
    const oilId = 123;
    actions$ = of(deleteOilById({ id: oilId }));
    mockApiBackendService.dropOilById.and.returnValue(of());
    effects.dropOilById$.subscribe();
    expect(mockApiBackendService.dropOilById).toHaveBeenCalledOnceWith(oilId);
  });

  it('should update oil', () => {
    const oilId = 123;
    const oilInput: OilInput = {
      date: '',
      filled: 100,
    };
    const oilResponse: Oil = {
      id: 1,
      date: new Date().toISOString(),
      filled: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockApiBackendService.updateOilById.and.returnValue(of(oilResponse));
    actions$ = of(updateOil({ id: oilId, input: oilInput }));
    effects.updateOil$.subscribe();
    expect(mockApiBackendService.updateOilById).toHaveBeenCalledOnceWith(
      oilId,
      oilInput
    );
  });
});
