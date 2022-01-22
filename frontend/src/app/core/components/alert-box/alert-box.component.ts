import { Component, Input } from '@angular/core';
import { IAlert } from '../../services/classes/alert';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
})
export class AlertBoxComponent {
  @Input() alerts: IAlert[] = [];

  public identifyById(index: number, item: IAlert): string {
    return item.uuid;
  }
}
