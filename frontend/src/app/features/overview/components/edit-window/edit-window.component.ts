import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from 'src/app/core/services/classes/api-backend';
import { EditWindow, IEditWindowUpdate } from '../../models/edit-window';

@Component({
  selector: 'app-edit-window',
  templateUrl: './edit-window.component.html',
})
export class EditWindowComponent implements OnInit {
  @Input() type?: EditWindow;
  @Input() entryId?: number;
  private updateSubject = new Subject<IEditWindowUpdate>();
  public editWindow = EditWindow;
  public update$ = this.updateSubject.asObservable();
  public oil$?: Observable<Oil>;
  public water$?: Observable<Water>;
  public power$?: Observable<Power>;

  constructor(
    private readonly bsModalRef: BsModalRef,
    private readonly backendService: ApiBackendService
  ) {}

  ngOnInit(): void {
    if (this.entryId == null) {
      throw new Error('EditWindowComponent: Missing entryId');
    }
    switch (this.type) {
      case EditWindow.Oil:
        this.oil$ = this.backendService.getOilById(this.entryId);
        break;
      case EditWindow.Power:
        this.power$ = this.backendService.getPowerById(this.entryId);
        break;
      case EditWindow.Water:
        this.water$ = this.backendService.getWaterById(this.entryId);
        break;
      default:
        throw new Error('EditWindowComponent: Unexpected EditWindow type');
    }
  }

  public close(): void {
    this.bsModalRef.hide();
  }

  public updateEntry(formInput: PowerInput | OilInput | WaterInput): void {
    if (this.type == null || this.entryId == null) {
      throw new Error('Type or id is not defined');
    }
    this.updateSubject.next({
      ...formInput,
      type: this.type,
      id: this.entryId,
    });
    this.bsModalRef.hide();
  }
}
