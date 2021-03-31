import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { of, throwError } from 'rxjs';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Oil, Power, Water } from 'src/app/core/services/classes/api-backend';
import { SharedModule } from 'src/app/shared/shared.module';
import { IAlert } from '../creator';
import { IFormResult } from '../models/form-result';

import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;
  let mockBackendService: jasmine.SpyObj<ApiBackendService>;

  let dummyFormResult: IFormResult;
  let dummyPowerRes: Power;
  let dummyWaterRes: Water;
  let dummyAlert: IAlert;
  let dummyOilRes: Oil;

  beforeEach(async () => {
    mockBackendService = jasmine.createSpyObj('BackendService', [
      'postPower',
      'postWater',
      'postOil',
    ]);

    await TestBed.configureTestingModule({
      declarations: [CreatorComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        FormsModule,
        AlertModule.forRoot(),
        TabsModule.forRoot(),
        ButtonsModule.forRoot(),
        BsDatepickerModule.forRoot(),
      ],
      providers: [
        {
          provide: ApiBackendService,
          useValue: mockBackendService,
        },
      ],
    }).compileComponents();

    dummyFormResult = {
      date: new Date().toISOString(),
      value: 1.5,
    };
    dummyPowerRes = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dummyWaterRes = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dummyAlert = {
      uuid: '1',
      type: 'success',
      msg: 'Test',
    };
    dummyOilRes = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // init mocks
    mockBackendService.postWater.and.returnValue(of(dummyWaterRes));
    mockBackendService.postPower.and.returnValue(of(dummyPowerRes));
    mockBackendService.postOil.and.returnValue(of(dummyOilRes));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit Water and return submited value on success', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    component.submitWater(dummyFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      cubicmeter: dummyFormResult.value,
    });
    expect(spyAddAlert).toHaveBeenCalledWith(
      'Wasserstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedWater).toEqual(dummyWaterRes);
  });

  it('should call error alert when submit water failed', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    mockBackendService.postWater.and.returnValue(throwError(new Error('Test')));

    component.submitWater(dummyFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      cubicmeter: dummyFormResult.value,
    });
    expect(spyAddAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Power and return submited value on success', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    component.submitPower(dummyFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      kwh: dummyFormResult.value,
    });
    expect(spyAddAlert).toHaveBeenCalledWith(
      'Stromzählerstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedPower).toEqual(dummyPowerRes);
  });

  it('should call error alert when submit power failed', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    mockBackendService.postPower.and.returnValue(throwError(new Error('Test')));

    component.submitPower(dummyFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      kwh: dummyFormResult.value,
    });
    expect(spyAddAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Oil and return submited value on success', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    component.submitOil(dummyFormResult);

    expect(component.postedOil).toEqual(dummyOilRes);
    expect(spyAddAlert).toHaveBeenCalledWith(
      'Ölstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(mockBackendService.postOil).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      filled: dummyFormResult.value,
    });
  });

  it('should call error alert when submit oil failed', () => {
    const spyAddAlert = spyOn(component, 'addAlert');

    mockBackendService.postOil.and.returnValue(throwError(new Error('Test')));

    component.submitOil(dummyFormResult);

    expect(mockBackendService.postOil).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      filled: dummyFormResult.value,
    });
    expect(spyAddAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should add and remove Alert', () => {
    jasmine.clock().install();
    component.addAlert(dummyAlert.msg, dummyAlert.type, 100);
    expect(component.alerts[0]).toBeDefined();
    jasmine.clock().tick(100);
    expect(component.alerts).toEqual([]);
    expect(component.alerts[0]).toBeUndefined();
    jasmine.clock().uninstall();
  });

  it('should render alert', () => {
    const creatorDebug: DebugElement = fixture.debugElement;
    const creatorNative: HTMLElement = creatorDebug.nativeElement;
    expect(creatorNative.querySelector('alert')).toBeFalsy();
    fixture.componentInstance.alerts.push(dummyAlert);
    fixture.detectChanges();
    expect(creatorNative.querySelector('alert')).toBeDefined();
    fixture.componentInstance.alerts = [];
    fixture.detectChanges();
  });
});
