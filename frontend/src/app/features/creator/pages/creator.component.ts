import { Component, OnDestroy } from '@angular/core';
import { ApiBackendService } from '../../../core/services/api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from '../../../core/services/classes/api-backend';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
})
export class CreatorComponent implements OnDestroy {
  public postedOil?: Oil;
  public postedWater?: Water;
  public postedPower?: Power;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly apiBackendService: ApiBackendService,
    private readonly alertService: AlertService
  ) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submitPower(powerForm: PowerInput): void {
    this.apiBackendService
      .postPower(powerForm)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (power) => {
          this.postedPower = power;
          this.alertService.addAlert(
            'Stromzählerstand <strong>erfolgreich</strong> übermittelt!',
            'success'
          );
        },
        (err) => {
          console.error(err);
          this.alertService.addAlert(
            '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        }
      );
  }

  public submitWater(waterForm: WaterInput): void {
    this.apiBackendService
      .postWater(waterForm)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.postedWater = res;
          this.alertService.addAlert(
            'Wasserstand <strong>erfolgreich</strong> übermittelt!',
            'success'
          );
        },
        (err) => {
          console.error(err);
          this.alertService.addAlert(
            '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        }
      );
  }

  public submitOil(oilForm: OilInput): void {
    this.apiBackendService
      .postOil(oilForm)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        (res) => {
          this.postedOil = res;
          this.alertService.addAlert(
            'Ölstand <strong>erfolgreich</strong> übermittelt!',
            'success'
          );
        },
        (err) => {
          console.error(err);
          this.alertService.addAlert(
            '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        }
      );
  }
}
