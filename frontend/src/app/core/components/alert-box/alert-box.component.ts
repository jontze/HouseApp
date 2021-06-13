import { Component, Input, OnInit } from '@angular/core';
import { IAlert } from '../../services/classes/alert';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css'],
})
export class AlertBoxComponent implements OnInit {
  @Input() alerts: IAlert[] = [];

  ngOnInit(): void {}

  public identifyById(index: number, item: IAlert): string {
    return item.uuid;
  }
}
