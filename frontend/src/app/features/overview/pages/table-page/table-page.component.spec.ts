import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { deleteOilById, updateOil } from 'src/app/store/oil/oil.action';
import { deletePowerById, updatePower } from 'src/app/store/power/power.action';
import { deleteWaterById, updateWater } from 'src/app/store/water/water.action';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';

import { TablePageComponent } from './table-page.component';

describe('TablePageComponent', () => {
  let component: TablePageComponent;
  let fixture: ComponentFixture<TablePageComponent>;
  let mockStoreService: jasmine.SpyObj<Store>;

  beforeEach(async () => {
    mockStoreService = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    await TestBed.configureTestingModule({
      declarations: [TablePageComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStoreService,
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

  it('should delete oil', () => {
    component.deleteOil(1);
    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      deleteOilById({ id: 1 })
    );
  });

  it('should update oil', () => {
    const id = 1;
    const date = new Date().toISOString();
    const filled = 1000;
    component.updateOil({ id, filled, date, type: EditWindow.Oil });

    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      updateOil({
        id,
        input: { date, filled },
      })
    );
  });

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

  it('should delete water and refetch data', () => {
    component.deleteWater(1);
    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      deleteWaterById({ id: 1 })
    );
  });

  it('should update water', () => {
    const id = 1;
    const date = new Date().toISOString();
    const cubicmeter = 1000;
    component.updateWater({ id, cubicmeter, date, type: EditWindow.Water });

    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      updateWater({
        id,
        input: { date, cubicmeter },
      })
    );
  });

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

  it('should delete power', () => {
    component.deletePower(1);
    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      deletePowerById({ id: 1 })
    );
  });

  it('should update power', () => {
    const id = 1;
    const date = new Date().toISOString();
    const kwh = 1000;
    component.updatePower({ id, kwh, date, type: EditWindow.Power });

    expect(mockStoreService.dispatch).toHaveBeenCalledOnceWith(
      updatePower({
        id,
        input: { date, kwh },
      })
    );
  });

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
