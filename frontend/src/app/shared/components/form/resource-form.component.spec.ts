import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { ResourceFormComponent } from './resource-form.component';

describe('ResourceFormComponent', () => {
  let component: ResourceFormComponent;
  let fixture: ComponentFixture<ResourceFormComponent>;

  let dummyDate = '12.12.12';
  let dummyValue = 123.45;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourceFormComponent],
      providers: [FormBuilder, BsLocaleService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit submit event and clear input', () => {
    const spyFormEmit = spyOn(component.submitFormEvent, 'emit');

    component.form.value['date'] = dummyDate;
    component.form.value['value'] = dummyValue;

    component.submitForm();

    expect(spyFormEmit).toHaveBeenCalledWith({
      date: dummyDate,
      value: dummyValue,
    });
    expect(component.form.value['date']).toBeNull();
    expect(component.form.value['value']).toBeNull();
  });
});
