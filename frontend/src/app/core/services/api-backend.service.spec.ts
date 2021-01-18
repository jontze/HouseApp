import { HttpClient, HttpClientModule } from '@angular/common/http';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiBackendService } from './api-backend.service';
import { Oil, Power, Water } from './classes/api-backend';

describe('ApiBackendService', () => {
  let service: ApiBackendService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'post'
    ]);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ApiBackendService,
        {
          provide: HttpClient,
          useValue: mockHttpClient,
        },
      ],
    });

    service = TestBed.inject(ApiBackendService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create httpClient', () => {
    expect(mockHttpClient).toBeTruthy();
  })

  it('should return Oil-Array', fakeAsync(() => {
    const expectedOil: Oil[] = [
      {
        id: 1,
        filled: 120,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    mockHttpClient.get.and.returnValue(of(expectedOil))
    
    let receivedOil: Oil[] = [];
    service.getOil().subscribe((oil) => {
      receivedOil = oil;
    })

    flush();

    expect(receivedOil).toBe(expectedOil);
    expect(mockHttpClient.get).toHaveBeenCalled();
  }))

  it('should return Power-Array', fakeAsync(() => {
    const expectedPower: Power[] = [
      {
        id: 1,
        kwh: 120,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    mockHttpClient.get.and.returnValue(of(expectedPower));

    let receivedPower: Power[] = []
    service.getPower().subscribe((power) => {
      receivedPower = power;
    });

    flush();

    expect(receivedPower).toBe(expectedPower);
    expect(mockHttpClient.get).toHaveBeenCalled();
  }))

  it('should return Water-Array', fakeAsync(() => {
    const expectedWater: Water[] = [
      {
        id: 1,
        cubicmeter: 120,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    mockHttpClient.get.and.returnValue(of(expectedWater));

    let receivedWater: Water[] = []
    service.getWater().subscribe((water) => {
      receivedWater = water;
    });

    flush();

    expect(receivedWater).toBe(expectedWater);
    expect(mockHttpClient.get).toHaveBeenCalled();
  }))

  it('should submit Oil', fakeAsync(() => {
    const submittedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedOil))

    let receivedOil!: Oil;
    service.postOil(submittedOil).subscribe((oil) => {
      receivedOil = oil;
    })

    flush();

    expect(receivedOil).toBe(submittedOil);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }))

  it('should submit Power', fakeAsync(() => {
    const submittedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedPower))

    let receivedPower!: Power;
    service.postPower(submittedPower).subscribe((power) => {
      receivedPower = power;
    });
    
    flush();

    expect(receivedPower).toBe(submittedPower);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }))

  it('should submit Water', fakeAsync(() => {
    const submittedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockHttpClient.post.and.returnValue(of(submittedWater));

    let receivedWater!: Water;
    service.postWater(submittedWater).subscribe((water) => {
      receivedWater = water;
    });

    flush();

    expect(receivedWater).toBe(submittedWater);
    expect(mockHttpClient.post).toHaveBeenCalled();
  }))
});
