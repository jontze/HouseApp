import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Power, PowerInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-power-form',
  templateUrl: './power-form.component.html',
})
export class PowerFormComponent {
  @Input() power$?: Observable<Power>;
  @Output() submitPowerEvent = new EventEmitter<PowerInput>();

  get powerFormData$(): Observable<IFormResult> | undefined {
    return this.power$?.pipe(
      map((power) => ({
        date: power.date,
        id: power.id,
        value: power.kwh,
      }))
    );
  }

  public submitPower(submitValues: IFormResult) {
    this.submitPowerEvent.emit({
      kwh: submitValues.value,
      date: submitValues.date,
    });
  }
}
