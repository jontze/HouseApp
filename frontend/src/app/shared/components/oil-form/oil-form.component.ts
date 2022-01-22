import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Oil, OilInput } from 'src/app/core/services/classes/api-backend';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-oil-form',
  templateUrl: './oil-form.component.html',
})
export class OilFormComponent {
  @Input() oil$?: Observable<Oil>;
  @Output() submitOilEvent = new EventEmitter<OilInput>();

  get oilFormData$(): Observable<IFormResult> | undefined {
    return this.oil$?.pipe(
      map((oil) => ({
        date: oil.date,
        id: oil.id,
        value: oil.filled,
      }))
    );
  }

  public placeholder = 'Gebe Ölstand ein';

  public submitOil(submitValues: IFormResult): void {
    this.submitOilEvent.emit({
      filled: submitValues.value,
      date: submitValues.date,
    });
  }
}
