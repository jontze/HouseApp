import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { defineLocale, deLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IFormResult } from '../../models/form-result';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/de';
import { Observable, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-resource-form',
  templateUrl: './resource-form.component.html',
})
export class ResourceFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() header: string = '';
  @Input() valueLabel: string = '';
  @Input() valuePlaceholder: string = '';
  @Input() valueInput?: number;
  @Input() dateLabel: string = 'Datum';
  @Input() dateInput?: string;
  @Input() data$?: Observable<IFormResult>;

  @Output() submitFormEvent = new EventEmitter<IFormResult>();

  public form = this.fb.group({
    id: [''],
    value: ['', Validators.required],
    date: ['', Validators.required],
  });

  private ngUnsubscribe = new ReplaySubject();

  constructor(
    private readonly fb: FormBuilder,
    private readonly bsLocalService: BsLocaleService
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {
    this.data$?.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data) => {
      this.form.setValue(
        {
          id: data.id,
          date: this.parseDateString(data.date),
          value: data.value,
        },
        { emitEvent: false }
      );
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['dateInput'] != null &&
      changes['dateInput'].currentValue != null
    ) {
      this.form.patchValue({
        date: this.parseDateString(changes['dateInput'].currentValue),
      });
    }
  }

  submitForm(): void {
    this.submitFormEvent.emit({
      date: this.form.value['date'],
      value: this.form.value['value'],
    });
    this.form.reset();
  }

  private parseDateString(dateString: string): string {
    dayjs.extend(customParseFormat);
    dayjs.locale('de');
    return dayjs(dateString.split('T')[0], 'YYYY-MM-DD', true).format(
      'DD.MM.YYYY'
    );
  }
}
