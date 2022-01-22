import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { of, throwError } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from 'src/app/core/services/classes/api-backend';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;
  let mockBackendService: jasmine.SpyObj<ApiBackendService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;

  let dummyWaterFormResult: WaterInput;
  let dummyPowerFormResult: PowerInput;
  let dummyOilFormResult: OilInput;
  let dummyPowerRes: Power;
  let dummyWaterRes: Water;
  let dummyOilRes: Oil;

  beforeEach(async () => {
    mockBackendService = jasmine.createSpyObj('BackendService', [
      'postPower',
      'postWater',
      'postOil',
    ]);
    mockAlertService = jasmine.createSpyObj('AlertService', ['addAlert']);

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
        {
          provide: AlertService,
          useValue: mockAlertService,
        },
      ],
    }).compileComponents();

    dummyWaterFormResult = {
      date: new Date().toISOString(),
      cubicmeter: 1.5,
    };
    dummyOilFormResult = {
      date: new Date().toISOString(),
      filled: 1.5,
    };
    dummyPowerFormResult = {
      date: new Date().toISOString(),
      kwh: 1.5,
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
    component.submitWater(dummyWaterFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith(
      dummyWaterFormResult
    );
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Wasserstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedWater).toEqual(dummyWaterRes);
  });

  it('should call error alert when submit water failed', () => {
    mockBackendService.postWater.and.returnValue(throwError(new Error('Test')));

    component.submitWater(dummyWaterFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith(
      dummyWaterFormResult
    );
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Power and return submited value on success', () => {
    component.submitPower(dummyPowerFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith(
      dummyPowerFormResult
    );
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Stromzählerstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedPower).toEqual(dummyPowerRes);
  });

  it('should call error alert when submit power failed', () => {
    mockBackendService.postPower.and.returnValue(throwError(new Error('Test')));

    component.submitPower(dummyPowerFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith(
      dummyPowerFormResult
    );
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Oil and return submited value on success', () => {
    component.submitOil(dummyOilFormResult);

    expect(component.postedOil).toEqual(dummyOilRes);
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Ölstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(mockBackendService.postOil).toHaveBeenCalledWith(dummyOilFormResult);
  });

  it('should call error alert when submit oil failed', () => {
    mockBackendService.postOil.and.returnValue(throwError(new Error('Test')));

    component.submitOil(dummyOilFormResult);

    expect(mockBackendService.postOil).toHaveBeenCalledWith(dummyOilFormResult);
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });
});
