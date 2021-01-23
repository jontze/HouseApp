import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { of } from 'rxjs';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';
import { SharedModule } from '../shared/shared.module';
import { IAlert } from './creator';

import { CreatorComponent } from './creator.component';

describe('CreatorComponent', () => {
  let component: CreatorComponent;
  let fixture: ComponentFixture<CreatorComponent>;
  let mockBackendService: jasmine.SpyObj<ApiBackendService>;
  let testOil: Oil = {
    id: 1,
    filled: 120,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let testPower: Power = {
    id: 1,
    kwh: 120,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let testWater: Water = {
    id: 1,
    cubicmeter: 120,
    date: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let testAlert: IAlert = {
    uuid: '1',
    type: 'success',
    msg: 'Test',
  };

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

    mockBackendService.postPower.and.returnValue(of(testPower));
    mockBackendService.postOil.and.returnValue(of(testOil));
    mockBackendService.postWater.and.returnValue(of(testWater));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit Water', () => {
    component.waterForm.controls['date'].setValue(testWater.date);
    component.waterForm.controls['m3'].setValue(testWater.cubicmeter);
    component.submitWater();
    expect(component.postedWater).toEqual(testWater);
    expect(mockBackendService.postWater).toHaveBeenCalled();
  });

  it('should submit Power', () => {
    component.powerForm.controls['date'].setValue(testPower.date);
    component.powerForm.controls['kwh'].setValue(testPower.kwh);
    component.submitPower();
    expect(component.postedPower).toEqual(testPower);
    expect(mockBackendService.postPower).toHaveBeenCalled();
  });

  it('should submit Oil', () => {
    component.oilForm.controls['date'].setValue(testOil.date);
    component.oilForm.controls['filled'].setValue(testOil.filled);
    component.submitOil();
    expect(component.postedOil).toEqual(testOil);
    expect(mockBackendService.postOil).toHaveBeenCalled();
  });

  it('should add and remove Alert', () => {
    jasmine.clock().install();
    component.addAlert(testAlert.msg, testAlert.type, 100);
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
    fixture.componentInstance.alerts.push(testAlert);
    fixture.detectChanges();
    expect(creatorNative.querySelector('alert')).toBeDefined();
    fixture.componentInstance.alerts = [];
    fixture.detectChanges();
  });

  it('should enable disabled button', () => {
    const creatorDebug: DebugElement = fixture.debugElement;
    const creatorNative: HTMLElement = creatorDebug.nativeElement;
    expect(
      creatorNative.querySelector('button')?.getAttribute('disabled')
    ).toBe('');
    fixture.componentInstance.powerForm.controls['date'].setValue(
      testPower.date
    );
    fixture.componentInstance.powerForm.controls['kwh'].setValue(testPower.kwh);
    fixture.detectChanges();
    expect(
      creatorNative.querySelector('button')?.getAttribute('disabled')
    ).toBeNull();
  });
});
