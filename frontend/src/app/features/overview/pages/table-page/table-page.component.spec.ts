import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of, throwError } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Oil, Power, Water } from 'src/app/core/services/classes/api-backend';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';

import { TablePageComponent } from './table-page.component';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;
  let mockApiService: jasmine.SpyObj<ApiBackendService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;
  let mockStoreService: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockAlertService = jasmine.createSpyObj('AlertService', ['addAlert']);
    mockStoreService = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    mockApiService = jasmine.createSpyObj('ApiBackendService', [
      'dropOilById',
      'fetchOil',
      'updateOilById',
      'dropWaterById',
      'fetchWater',
      'updateWaterById',
      'dropPowerById',
      'fetchPower',
      'updatePowerById',
    ]);

    await TestBed.configureTestingModule({
      declarations: [TablePageComponent],
      providers: [
        {
          provide: AlertService,
          useValue: mockAlertService,
        },
        {
          provide: Store,
          useValue: mockStoreService,
        },
        {
          provide: ApiBackendService,
          useValue: mockApiService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockStoreService.select).toHaveBeenCalledTimes(3);
  });

  it(
    'should delete oil and refetch data',
    waitForAsync(() => {
      mockApiService.dropOilById.and.returnValue(of(200));
      mockApiService.fetchOil.and.returnValue(of([]));
      component.deleteOil(1);
      expect(mockApiService.dropOilById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchOil).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle error during oil deletion',
    waitForAsync(() => {
      mockApiService.dropOilById.and.returnValue(throwError({}));
      mockApiService.fetchOil.and.returnValue(of([]));
      component.deleteOil(1);
      expect(mockApiService.dropOilById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchOil).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).not.toHaveBeenCalled();
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should update oil and refetch data',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Oil,
        filled: 1000,
        date: new Date().toISOString(),
      };
      mockApiService.updateOilById.and.returnValue(
        of({ id: 1 } as unknown as Oil)
      );
      mockApiService.fetchOil.and.returnValue(of([]));
      component.updateOil(mockUpdateData);
      expect(mockApiService.updateOilById).toHaveBeenCalledOnceWith(
        mockUpdateData.id,
        { date: mockUpdateData.date, filled: mockUpdateData.filled! }
      );
      expect(mockApiService.fetchOil).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle wrong event on oil update',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Water,
        filled: 1000,
        date: new Date().toISOString(),
      };
      expect(() => {
        component.updateOil(mockUpdateData);
      }).toThrowError('Wrong update type for editing a oil entry');
    })
  );

  it(
    'should delete water and refetch data',
    waitForAsync(() => {
      mockApiService.dropWaterById.and.returnValue(of(200));
      mockApiService.fetchWater.and.returnValue(of([]));
      component.deleteWater(1);
      expect(mockApiService.dropWaterById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchWater).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle error during water deletion',
    waitForAsync(() => {
      mockApiService.dropWaterById.and.returnValue(throwError({}));
      mockApiService.fetchWater.and.returnValue(of([]));
      component.deleteWater(1);
      expect(mockApiService.dropWaterById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchWater).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).not.toHaveBeenCalled();
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should update water and refetch data',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Water,
        cubicmeter: 1000,
        date: new Date().toISOString(),
      };
      mockApiService.updateWaterById.and.returnValue(
        of({ id: 1 } as unknown as Water)
      );
      mockApiService.fetchWater.and.returnValue(of([]));
      component.updateWater(mockUpdateData);
      expect(mockApiService.updateWaterById).toHaveBeenCalledOnceWith(
        mockUpdateData.id,
        { date: mockUpdateData.date, cubicmeter: mockUpdateData.cubicmeter! }
      );
      expect(mockApiService.fetchWater).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle wrong event on water update',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Oil,
        filled: 1000,
        date: new Date().toISOString(),
      };
      expect(() => {
        component.updateWater(mockUpdateData);
      }).toThrowError('Wrong update type for editing a water entry');
    })
  );

  it(
    'should delete power and refetch data',
    waitForAsync(() => {
      mockApiService.dropPowerById.and.returnValue(of(200));
      mockApiService.fetchPower.and.returnValue(of([]));
      component.deletePower(1);
      expect(mockApiService.dropPowerById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchPower).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle error during power deletion',
    waitForAsync(() => {
      mockApiService.dropPowerById.and.returnValue(throwError({}));
      mockApiService.fetchPower.and.returnValue(of([]));
      component.deletePower(1);
      expect(mockApiService.dropPowerById).toHaveBeenCalledOnceWith(1);
      expect(mockApiService.fetchPower).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).not.toHaveBeenCalled();
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should update power and refetch data',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Power,
        kwh: 1000,
        date: new Date().toISOString(),
      };
      mockApiService.updatePowerById.and.returnValue(
        of({ id: 1 } as unknown as Power)
      );
      mockApiService.fetchPower.and.returnValue(of([]));
      component.updatePower(mockUpdateData);
      expect(mockApiService.updatePowerById).toHaveBeenCalledOnceWith(
        mockUpdateData.id,
        { date: mockUpdateData.date, kwh: mockUpdateData.kwh! }
      );
      expect(mockApiService.fetchPower).toHaveBeenCalledTimes(1);
      expect(mockStoreService.dispatch).toHaveBeenCalledTimes(1);
      expect(mockAlertService.addAlert).toHaveBeenCalledTimes(1);
    })
  );

  it(
    'should handle wrong event on power update',
    waitForAsync(() => {
      const mockUpdateData: IEditWindowUpdate = {
        id: 1,
        type: EditWindow.Water,
        filled: 1000,
        date: new Date().toISOString(),
      };
      expect(() => {
        component.updatePower(mockUpdateData);
      }).toThrowError('Wrong update type for editing a power entry');
    })
  );
});
