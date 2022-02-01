import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';
import { Store } from '@ngrx/store';
import { selectOilCollection } from 'src/app/store/oil/oil.selector';
import { selectWaterCollection } from 'src/app/store/water/water.selector';
import { selectPowerCollection } from 'src/app/store/power/power.selector';
import { deleteOilById, updateOil } from 'src/app/store/oil/oil.action';
import { deleteWaterById, updateWater } from 'src/app/store/water/water.action';
import { deletePowerById, updatePower } from 'src/app/store/power/power.action';

registerLocaleData(localeDe, localeDeExtra);

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
})
export class TablePageComponent {
  public oil$ = this.store.select(selectOilCollection);
  public water$ = this.store.select(selectWaterCollection);
  public power$ = this.store.select(selectPowerCollection);
  public editWindow = EditWindow;

  constructor(private readonly store: Store) {}

  public deleteOil(id: number): void {
    this.store.dispatch(deleteOilById({ id }));
  }

  public updateOil(updateEvent: IEditWindowUpdate): void {
    if (updateEvent.type !== EditWindow.Oil || updateEvent.filled == null) {
      throw new Error('Wrong update type for editing a oil entry');
    }
    this.store.dispatch(
      updateOil({
        id: updateEvent.id,
        input: { date: updateEvent.date, filled: updateEvent.filled },
      })
    );
  }

  public deleteWater(id: number): void {
    this.store.dispatch(deleteWaterById({ id }));
  }

  public updateWater(updateEvent: IEditWindowUpdate): void {
    if (
      updateEvent.type !== EditWindow.Water ||
      updateEvent.cubicmeter == null
    ) {
      throw new Error('Wrong update type for editing a water entry');
    }
    this.store.dispatch(
      updateWater({
        id: updateEvent.id,
        input: { date: updateEvent.date, cubicmeter: updateEvent.cubicmeter },
      })
    );
  }

  public deletePower(id: number): void {
    this.store.dispatch(deletePowerById({ id }));
  }

  public updatePower(updateEvent: IEditWindowUpdate): void {
    if (updateEvent.type !== EditWindow.Power || updateEvent.kwh == null) {
      throw new Error('Wrong update type for editing a power entry');
    }
    this.store.dispatch(
      updatePower({
        id: updateEvent.id,
        input: { date: updateEvent.date, kwh: updateEvent.kwh },
      })
    );
  }
}
