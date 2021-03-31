import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { defineLocale, deLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { IFormResult } from '../../models/form-result';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @Input() header: string = '';
  @Input() valueLabel: string = '';
  @Input() valuePlaceholder: string = '';
  @Input() dateLabel: string = 'Datum';

  @Output() submitFormEvent = new EventEmitter<IFormResult>();

  form = this.fb.group({
    value: ['', Validators.required],
    date: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly bsLocalService: BsLocaleService
  ) {
    defineLocale('de', deLocale);
    this.bsLocalService.use('de');
  }

  ngOnInit(): void {}

  submitForm(): void {
    this.submitFormEvent.emit({
      date: this.form.value['date'],
      value: this.form.value['value'],
    });
    this.form.reset();
  }
}
