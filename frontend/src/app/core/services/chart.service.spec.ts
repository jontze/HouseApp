import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiBackendService } from './api-backend.service';

import { ChartService } from './chart.service';
import { Oil, Power, Water } from './classes/api-backend';

describe('ChartService', () => {
  let service: ChartService;

  let mockBackendService: jasmine.SpyObj<ApiBackendService>;

  const dummyOil: Oil[] = [
    {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const dummyWater: Water[] = [
    {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  const dummyPower: Power[] = [
    {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockBackendService = jasmine.createSpyObj('ApiBackendService', [
      'getPower',
      'getWater',
      'getOil',
    ]);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiBackendService,
          useValue: mockBackendService,
        },
      ],
    });
    service = TestBed.inject(ChartService);

    mockBackendService.getOil.and.returnValue(of(dummyOil));
    mockBackendService.getPower.and.returnValue(of(dummyPower));
    mockBackendService.getWater.and.returnValue(of(dummyWater));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get PowerChartData', () => {
    service.getPowerChartData().subscribe((power) => {
      expect(power[0].name).toBe('KW/h');
      expect(power[0].series.length).toBeGreaterThan(0);
    });
  });

  it('should get WaterChartData', () => {
    service.getWaterChartData().subscribe((water) => {
      expect(water[0].name).toBe('m³');
      expect(water[0].series.length).toBeGreaterThan(0);
    });
  });

  it('should get OilChartData', () => {
    service.getOilChartData().subscribe((oil) => {
      expect(oil[0].name).toBe('Ölstand');
      expect(oil[0].series.length).toBeGreaterThan(0);
    });
  });
});
