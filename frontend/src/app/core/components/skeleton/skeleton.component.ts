import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AlertService } from '../../services/alert.service';
import { IAlert } from '../../services/classes/alert';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.css'],
})
export class SkeletonComponent implements OnInit, OnDestroy {
  public alerts: IAlert[] = [];
  private readonly ngUnsubscribe = new Subject();

  constructor(private readonly alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alerts$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((alert) => {
        this.alerts.push(alert);
      });
    this.alertService.removeAlert$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((alertId) => {
        const index = this.alerts.findIndex((alert) => alert.uuid === alertId);
        this.alerts.splice(index);
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
