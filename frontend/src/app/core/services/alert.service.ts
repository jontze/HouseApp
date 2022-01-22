import { Injectable, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ReplaySubject } from 'rxjs';
import { IAlert, IAlertType } from './classes/alert';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public alerts$ = new ReplaySubject<IAlert>(1);
  public removeAlert$ = new ReplaySubject<string>(1);
  private DEFAULT_SHOW_TIME = 5000;

  constructor(private readonly sanitizer: DomSanitizer) {}

  public addAlert(
    message: string,
    type: IAlertType,
    showTime = this.DEFAULT_SHOW_TIME
  ) {
    const id: string = uuid();
    this.alerts$.next({
      uuid: id,
      message: this.constructAlertMsg(message),
      type,
    });

    setTimeout(() => {
      this.removeAlert$.next(id);
    }, showTime);
  }

  private constructAlertMsg(message: string): string {
    const msg = this.sanitizer.sanitize(SecurityContext.HTML, message);
    if (msg == null) {
      throw new Error('Failed to construct alert message');
    }
    return msg;
  }
}
