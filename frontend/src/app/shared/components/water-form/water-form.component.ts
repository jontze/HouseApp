import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Water, WaterInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-water-form',
  templateUrl: './water-form.component.html',
})
export class WaterFormComponent {
  @Input() water$?: Observable<Water>;
  @Output() submitWaterEvent = new EventEmitter<WaterInput>();

  get waterFormData$(): Observable<IFormResult> | undefined {
    return this.water$?.pipe(
      map((water) => ({
        date: water.date,
        id: water.id,
        value: water.cubicmeter,
      }))
    );
  }

  public submitWater(submitValues: IFormResult) {
    this.submitWaterEvent.emit({
      date: submitValues.date,
      cubicmeter: submitValues.value,
    });
  }
}
