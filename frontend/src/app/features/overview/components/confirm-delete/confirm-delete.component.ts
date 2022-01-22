import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { IConfirmedDeleteMsg } from '../../models/confirm-delete';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
})
export class ConfirmDeleteComponent {
  @Input() entryId?: number;
  private decisionSubject = new Subject<IConfirmedDeleteMsg>();
  public decision$ = this.decisionSubject.asObservable();

  constructor(public bsModalRef: BsModalRef) {}

  public closeAndDecline(): void {
    if (this.entryId == null) {
      throw new Error('entryId not defined in confirm modal');
    }
    this.decisionSubject.next({ id: this.entryId, shouldDelete: false });
    this.bsModalRef.hide();
  }

  public closeAndConfirm(): void {
    if (this.entryId == null) {
      throw new Error('entryId not defined in confirm modal');
    }
    this.decisionSubject.next({ id: this.entryId, shouldDelete: true });
    this.bsModalRef.hide();
  }
}
