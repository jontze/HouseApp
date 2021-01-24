import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CoreModule } from '../core/core.module';
import { ApiBackendService } from '../core/services/api-backend.service';
import { Oil, Power, Water } from '../core/services/classes/api-backend';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
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

  beforeEach(async () => {
    mockBackendService = jasmine.createSpyObj('BackendService', [
      'getOil',
      'getPower',
      'getWater',
    ]);

    await TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        {
          provide: ApiBackendService,
          useValue: mockBackendService,
        },
      ],
      declarations: [DashboardComponent],
    }).compileComponents();

    mockBackendService.getOil.and.returnValue(of([testOil]));
    mockBackendService.getPower.and.returnValue(of([testPower]));
    mockBackendService.getWater.and.returnValue(of([testWater]));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have defined Oil-/Power-/Water-ChartSettings', () => {
    expect(component.oilChartSettings).toBeDefined();
    expect(component.waterChartSettings).toBeDefined();
    expect(component.powerChartSettings).toBeDefined();
  });

  it('should set allOil-Data', () => {
    expect(component.allOil).toEqual([testOil]);
    expect(mockBackendService.getOil).toHaveBeenCalled();
  });

  it('should set allWater-Data', () => {
    expect(component.allWater).toEqual([testWater]);
    expect(mockBackendService.getWater).toHaveBeenCalled();
  });

  it('should set allPower-Data', () => {
    expect(component.allPower).toEqual([testPower]);
    expect(mockBackendService.getPower).toHaveBeenCalled();
  });
});
