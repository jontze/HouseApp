import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { EditWindowComponent } from '../edit-window/edit-window.component';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
})
export class ActionComponent implements OnInit, OnDestroy {
  @Input() identifier?: number;
  @Input() type?: EditWindow;
  @Output() changeEntry = new EventEmitter<IEditWindowUpdate>();
  @Output() deleteEntry = new EventEmitter<number>();
  confirmModalRef?: BsModalRef<ConfirmDeleteComponent>;
  editModalRef?: BsModalRef<EditWindowComponent>;
  private ngUnsubscribe = new Subject();

  constructor(private readonly modalService: BsModalService) {}

  ngOnInit(): void {
    if (this.identifier == null) {
      throw new Error('Identifier of action component not defined!');
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public openConfirmModal(): void {
    this.confirmModalRef = this.modalService.show(ConfirmDeleteComponent, {
      initialState: { entryId: this.identifier },
    });
    if (this.confirmModalRef.content?.decision$ == null) {
      throw new Error(
        "Could not subscribe to decision stream! 'desicion$' Observable is null."
      );
    }
    this.confirmModalRef.content.decision$
      .pipe(
        filter((decision) => decision.shouldDelete === true),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((decision) => {
        this.deleteEntry.emit(decision.id);
      });
  }

  public openEditModal(): void {
    this.editModalRef = this.modalService.show(EditWindowComponent, {
      initialState: { type: this.type, entryId: this.identifier },
      class: 'modal-lg',
    });
    if (this.editModalRef.content?.update$ == null) {
      throw new Error(
        "Could not subscribe to update stream! 'update$' Observable is null."
      );
    }
    this.editModalRef.content.update$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((update) => {
        this.changeEntry.emit(update);
      });
  }
}
