import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { of, throwError } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import { Oil, Power, Water } from 'src/app/core/services/classes/api-backend';
import { SharedModule } from 'src/app/shared/shared.module';
import { IFormResult } from '../models/form-result';
import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;
  let mockBackendService: jasmine.SpyObj<ApiBackendService>;
  let mockAlertService: jasmine.SpyObj<AlertService>;

  let dummyFormResult: IFormResult;
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
    component.submitWater(dummyFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      cubicmeter: dummyFormResult.value,
    });
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Wasserstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedWater).toEqual(dummyWaterRes);
  });

  it('should call error alert when submit water failed', () => {
    mockBackendService.postWater.and.returnValue(throwError(new Error('Test')));

    component.submitWater(dummyFormResult);

    expect(mockBackendService.postWater).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      cubicmeter: dummyFormResult.value,
    });
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Wassterstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Power and return submited value on success', () => {
    component.submitPower(dummyFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      kwh: dummyFormResult.value,
    });
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Stromzählerstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(component.postedPower).toEqual(dummyPowerRes);
  });

  it('should call error alert when submit power failed', () => {
    mockBackendService.postPower.and.returnValue(throwError(new Error('Test')));

    component.submitPower(dummyFormResult);

    expect(mockBackendService.postPower).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      kwh: dummyFormResult.value,
    });
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Stromzählerstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });

  it('should submit Oil and return submited value on success', () => {
    component.submitOil(dummyFormResult);

    expect(component.postedOil).toEqual(dummyOilRes);
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      'Ölstand <strong>erfolgreich</strong> übermittelt!',
      'success'
    );
    expect(mockBackendService.postOil).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      filled: dummyFormResult.value,
    });
  });

  it('should call error alert when submit oil failed', () => {
    mockBackendService.postOil.and.returnValue(throwError(new Error('Test')));

    component.submitOil(dummyFormResult);

    expect(mockBackendService.postOil).toHaveBeenCalledWith({
      date: dummyFormResult.date,
      filled: dummyFormResult.value,
    });
    expect(mockAlertService.addAlert).toHaveBeenCalledWith(
      '<strong>Fehler!</strong> Ölstand konnte <strong>nicht übermittel</strong> werden...',
      'danger'
    );
  });
});
