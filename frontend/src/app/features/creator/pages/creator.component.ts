import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { deLocale } from 'ngx-bootstrap/locale';
import { IFormResult } from '../models/form-result';
import { ApiBackendService } from '../../../core/services/api-backend.service';
import { Oil, Power, Water } from '../../../core/services/classes/api-backend';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit, OnDestroy {
  public postedOil?: Oil;
  public postedWater?: Water;
  public postedPower?: Power;
  private readonly ngUnsubscribe = new Subject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly apiBackendService: ApiBackendService,
    private readonly bsLocalService: BsLocaleService,
    private readonly alertService: AlertService
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  submitPower(powerForm: IFormResult): void {
    this.apiBackendService
      .postPower({
        date: powerForm.date,
        kwh: powerForm.value,
      })
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

  public submitWater(waterForm: IFormResult): void {
    this.apiBackendService
      .postWater({
        date: waterForm.date,
        cubicmeter: waterForm.value,
      })
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

  public submitOil(oilForm: IFormResult): void {
    this.apiBackendService
      .postOil({
        date: oilForm.date,
        filled: oilForm.value,
      })
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
