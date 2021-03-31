import { Component, OnDestroy, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { deLocale } from 'ngx-bootstrap/locale';
import { v4 as uuid } from 'uuid';
import { IAlert, AlertType } from '.././creator';
import { IFormResult } from '../models/form-result';
import { ApiBackendService } from '../../../core/services/api-backend.service';
import { Oil, Power, Water } from '../../../core/services/classes/api-backend';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit, OnDestroy {
  public alerts: IAlert[] = [];
  public postedOil?: Oil;
  public postedWater?: Water;
  public postedPower?: Power;
  private readonly showDuration: number = 10000;
  private readonly timeouts: number[] = [];
  private readonly subscriptions: Subscription[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly apiBackendService: ApiBackendService,
    private readonly bsLocalService: BsLocaleService,
    private readonly sanitizer: DomSanitizer
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {
    this.subscriptions.push();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.timeouts.forEach((t) => window.clearTimeout(t));
  }

  submitPower(powerForm: IFormResult): void {
    this.subscriptions.push(
      this.apiBackendService
        .postPower({
          date: powerForm.date,
          kwh: powerForm.value,
        })

        .subscribe(
          (power) => {
            this.postedPower = power;
            this.addAlert(
              'Stromzählerstand <strong>erfolgreich</strong> übermittelt!',
              'success'
            );
          },
          (err) => {
            console.error(err);
            this.addAlert(
              '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
              'danger'
            );
          }
        )
    );
  }

  public submitWater(waterForm: IFormResult): void {
    this.subscriptions.push(
      this.apiBackendService
        .postWater({
          date: waterForm.date,
          cubicmeter: waterForm.value,
        })
        .subscribe(
          (res) => {
            this.postedWater = res;
            this.addAlert(
              'Wasserstand <strong>erfolgreich</strong> übermittelt!',
              'success'
            );
          },
          (err) => {
            console.error(err);
            this.addAlert(
              '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
              'danger'
            );
          }
        )
    );
  }

  public submitOil(oilForm: IFormResult): void {
    this.subscriptions.push(
      this.apiBackendService
        .postOil({
          date: oilForm.date,
          filled: oilForm.value,
        })
        .subscribe(
          (res) => {
            this.postedOil = res;
            this.addAlert(
              'Ölstand <strong>erfolgreich</strong> übermittelt!',
              'success'
            );
          },
          (err) => {
            console.error(err);
            this.addAlert(
              '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
              'danger'
            );
          }
        )
    );
  }

  public addAlert(
    message: string,
    type: AlertType,
    showTime: number = this.showDuration
  ): void {
    const id: string = uuid();
    this.alerts.push({
      uuid: id,
      type: type,
      msg: this.sanitizer.sanitize(SecurityContext.HTML, message) ?? '',
    });
    this.timeouts.push(
      window.setTimeout(() => {
        this.removeAlert(id);
      }, showTime)
    );
  }

  private removeAlert(id: string): void {
    const index = this.alerts.findIndex((alert) => alert.uuid === id);
    this.alerts.splice(index);
  }
}
