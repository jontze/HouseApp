import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';

@Component({
  selector: 'app-interactive-table',
  templateUrl: './interactive-table.component.html',
})
export class InteractiveTableComponent {
  @Input() dataName: string = '';
  @Input() dataPropName: string = '';
  @Input() row$?: Observable<ReadonlyArray<any>>;
  @Input() editWindowType?: EditWindow;
  @Output() onEntryDelete = new EventEmitter<number>();
  @Output() onEntryUpdate = new EventEmitter<IEditWindowUpdate>();

  public deleteEntry(deleteId: number): void {
    this.onEntryDelete.emit(deleteId);
  }

  public updateEntry(updateEvent: IEditWindowUpdate): void {
    this.onEntryUpdate.emit(updateEvent);
  }
}
