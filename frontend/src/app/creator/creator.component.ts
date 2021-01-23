import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { deLocale } from 'ngx-bootstrap/locale';
import { v4 as uuid } from 'uuid';
import { IAlert, AlertType } from './creator';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  public powerForm = this.fb.group({
    date: ['', Validators.required],
    kwh: ['', Validators.required],
  });
  public waterForm = this.fb.group({
    date: ['', Validators.required],
    m3: ['', Validators.required],
  });
  public oilForm = this.fb.group({
    date: ['', Validators.required],
    filled: ['', Validators.required],
  });
  public alerts: IAlert[] = [];
  public postedOil!: Oil;
  public postedWater!: Water;
  public postedPower!: Power;
  private readonly showDuration: number = 5000;

  constructor(
    private readonly fb: FormBuilder,
    private readonly apiBackendService: ApiBackendService,
    private readonly bsLocalService: BsLocaleService,
    private readonly sanitizer: DomSanitizer
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {}

  public submitPower(): void {
    this.apiBackendService
      .postPower({
        date: this.powerForm.value.date,
        kwh: parseFloat(this.powerForm.value.kwh),
      })
      .subscribe(
        (res) => {
          this.postedPower = res;
        },
        (err) => {
          console.error(err);
          this.addAlert(
            '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        },
        () => {
          this.addAlert('Stromzählerstand erfolgreich übermittelt!', 'success');
        }
      );
  }

  public submitWater(): void {
    this.apiBackendService
      .postWater({
        date: this.waterForm.value.date,
        cubicmeter: parseFloat(this.waterForm.value.m3),
      })
      .subscribe(
        (res) => {
          this.postedWater = res;
        },
        (err) => {
          console.error(err);
          this.addAlert(
            '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        },
        () => {
          this.addAlert('Wasserstand erfolgreich übermittelt!', 'success');
        }
      );
  }

  public submitOil(): void {
    this.apiBackendService
      .postOil({
        date: this.oilForm.value.date,
        filled: parseFloat(this.oilForm.value.filled),
      })
      .subscribe(
        (res) => {
          this.postedOil = res;
        },
        (err) => {
          console.error(err);
          this.addAlert(
            '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
            'danger'
          );
        },
        () => {
          this.addAlert('Ölstand erfolgreich übermittelt!', 'success');
        }
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
    setTimeout(() => {
      this.removeAlert(id);
    }, showTime);
  }

  private removeAlert(id: string) {
    const index = this.alerts.findIndex((alert) => alert.uuid === id);
    this.alerts.splice(index);
  }
}
