import { Component, OnDestroy } from '@angular/core';
import { concat, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';
import { Store } from '@ngrx/store';
import { selectOilCollection } from 'src/app/store/oil/oil.selector';
import { selectWaterCollection } from 'src/app/store/water/water.selector';
import { selectPowerCollection } from 'src/app/store/power/power.selector';
import { retrievedOilList } from 'src/app/store/oil/oil.action';
import { retrievedWaterList } from 'src/app/store/water/water.action';
import { retrievedPowerList } from 'src/app/store/power/power.action';

registerLocaleData(localeDe, localeDeExtra);

@Component({
  selector: 'app-table-page',
  templateUrl: './table-page.component.html',
})
export class TablePageComponent implements OnDestroy {
  public oil$ = this.store.select(selectOilCollection);
  public water$ = this.store.select(selectWaterCollection);
  public power$ = this.store.select(selectPowerCollection);
  public editWindow = EditWindow;
  private ngUnsubscribe = new Subject();
  private deleteSuccessMsg = 'Eintrag <strong>erfolgreich</strong> gelöscht!';

  constructor(
    private readonly apiService: ApiBackendService,
    private readonly alertService: AlertService,
    private readonly store: Store
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public deleteOil(deleteId: number): void {
    concat(this.apiService.dropOilById(deleteId), this.apiService.fetchOil())
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedOilList({ oil: res }));
          } else {
            this.createResponseAlertBasedOnStatus(res);
          }
        },
        (error) => this.alertService.addAlert(error, 'danger')
      );
  }

  public updateOil(updateEvent: IEditWindowUpdate): void {
    if (updateEvent.type !== EditWindow.Oil || updateEvent.filled == null) {
      throw new Error('Wrong update type for editing a oil entry');
    }
    concat(
      this.apiService.updateOilById(updateEvent.id, {
        date: updateEvent.date,
        filled: updateEvent.filled,
      }),
      this.apiService.fetchOil()
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedOilList({ oil: res }));
          } else {
            this.alertService.addAlert(
              'Zählerstand erfolgreich geändert',
              'success'
            );
          }
        },
        (err) => {
          if (err instanceof Error) {
            this.alertService.addAlert(err.message, 'danger', 10000);
          }
          console.error(err);
        }
      );
  }

  public deleteWater(deleteId: number): void {
    concat(
      this.apiService.dropWaterById(deleteId),
      this.apiService.fetchWater()
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedWaterList({ water: res }));
          } else {
            this.createResponseAlertBasedOnStatus(res);
          }
        },
        (error) => this.alertService.addAlert(error, 'danger')
      );
  }

  public updateWater(updateEvent: IEditWindowUpdate): void {
    if (
      updateEvent.type !== EditWindow.Water ||
      updateEvent.cubicmeter == null
    ) {
      throw new Error('Wrong update type for editing a water entry');
    }
    concat(
      this.apiService.updateWaterById(updateEvent.id, {
        date: updateEvent.date,
        cubicmeter: updateEvent.cubicmeter,
      }),
      this.apiService.fetchWater()
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedWaterList({ water: res }));
          } else {
            this.alertService.addAlert(
              'Zählerstand erfolgreich geändert',
              'success'
            );
          }
        },
        (err) => {
          if (err instanceof Error) {
            this.alertService.addAlert(err.message, 'danger', 10000);
          }
          console.error(err);
        }
      );
  }

  public deletePower(deleteId: number): void {
    concat(
      this.apiService.dropPowerById(deleteId),
      this.apiService.fetchPower()
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedPowerList({ power: res }));
          } else {
            this.createResponseAlertBasedOnStatus(res);
          }
        },
        (error) => this.alertService.addAlert(error, 'danger')
      );
  }

  public updatePower(updateEvent: IEditWindowUpdate): void {
    if (updateEvent.type !== EditWindow.Power || updateEvent.kwh == null) {
      throw new Error('Wrong update type for editing a power entry');
    }
    concat(
      this.apiService.updatePowerById(updateEvent.id, {
        date: updateEvent.date,
        kwh: updateEvent.kwh,
      }),
      this.apiService.fetchPower()
    )
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          if (Array.isArray(res)) {
            this.store.dispatch(retrievedPowerList({ power: res }));
          } else {
            this.alertService.addAlert(
              'Zählerstand erfolgreich geändert',
              'success'
            );
          }
        },
        (err) => {
          if (err instanceof Error) {
            this.alertService.addAlert(err.message, 'danger', 10000);
          }
          console.error(err);
        }
      );
  }

  private constructDeleteFailMsg(statusCode: number): string {
    return `<strong>Fehler!</strong> Eintrag konnte <strong>nicht gelöscht</strong> werden... (Fehlercode: ${statusCode})`;
  }

  private createResponseAlertBasedOnStatus(statusCode: number) {
    if (statusCode === 200) {
      this.alertService.addAlert(this.deleteSuccessMsg, 'success');
    } else {
      this.alertService.addAlert(
        this.constructDeleteFailMsg(statusCode),
        'danger'
      );
    }
  }
}
