import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiBackendService } from './api-backend.service';
import {
  Oil,
  OilInput,
  Power,
  PowerInput,
  Water,
  WaterInput,
} from './classes/api-backend';

describe('ApiBackendService', () => {
  let service: ApiBackendService;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpClient', [
      'get',
      'post',
      'delete',
      'put',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiBackendService,
        {
          provide: HttpClient,
          useValue: mockHttpClient,
        },
      ],
    });

    service = TestBed.inject(ApiBackendService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create httpClient', () => {
    expect(mockHttpClient).toBeTruthy();
  });

  it('should request and get Oil-Array', async () => {
    const requested: Oil[] = [
      {
        id: 1,
        filled: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));
    let receivedOil = await service.fetchOil().toPromise();

    expect(receivedOil).toBe(requested);
  });

  it('should request and get Power-Array', async () => {
    const requested: Power[] = [
      {
        id: 1,
        kwh: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));

    let receivedPower = await service.fetchPower().toPromise();

    expect(receivedPower).toBe(requested);
  });

  it('should request and get Water-Array', async () => {
    const requested: Water[] = [
      {
        id: 1,
        cubicmeter: 120,
        date: new Date().toISOString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    mockHttpClient.get.and.returnValue(of(requested));
    let receivedWater = await service.fetchWater().toPromise();

    expect(receivedWater).toBe(requested);
  });

  it('should submit Oil', async () => {
    const submittedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedOil));

    let receivedOil = await service.postOil(submittedOil).toPromise();

    expect(receivedOil).toBe(submittedOil);
    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('should submit Power', async () => {
    const submittedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.post.and.returnValue(of(submittedPower));

    let receivedPower = await service.postPower(submittedPower).toPromise();

    expect(receivedPower).toBe(submittedPower);
    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('should submit Water', async () => {
    const submittedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockHttpClient.post.and.returnValue(of(submittedWater));

    let receivedWater = await service.postWater(submittedWater).toPromise();
    expect(receivedWater).toBe(submittedWater);
    expect(mockHttpClient.post).toHaveBeenCalled();
  });

  it('should delete oil by id', async () => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = await service.dropOilById(1).toPromise();

    expect(status).toBe(200);
  });

  it('should delete water by id', async () => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = await service.dropWaterById(1).toPromise();

    expect(status).toBe(200);
  });

  it('should delete power by id', async () => {
    mockHttpClient.delete.and.returnValue(of({ status: 200 }));

    let status = await service.dropPowerById(1).toPromise();

    expect(status).toBe(200);
  });

  it('should get oil by id', async () => {
    const requestedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedOil));

    let rcvOil = await service.getOilById(1).toPromise();

    expect(rcvOil).toBe(requestedOil);
  });

  it('should get water by id', async () => {
    const requestedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedWater));

    let rcvWater = await service.getWaterById(1).toPromise();

    expect(rcvWater).toBe(requestedWater);
  });

  it('should get power by id', async () => {
    const requestedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.get.and.returnValue(of(requestedPower));

    let rcvPower = await service.getPowerById(1).toPromise();

    expect(rcvPower).toBe(requestedPower);
  });

  it('should get update by id', async () => {
    const updatedOil: Oil = {
      id: 1,
      filled: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedOil));

    let rcvOil = await service
      .updateOilById(1, {} as unknown as OilInput)
      .toPromise();

    expect(rcvOil).toBe(updatedOil);
  });

  it('should update water by id', async () => {
    const updatedWater: Water = {
      id: 1,
      cubicmeter: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedWater));

    let rcvWater = await service
      .updateWaterById(1, {} as unknown as WaterInput)
      .toPromise();

    expect(rcvWater).toBe(updatedWater);
  });

  it('should update power by id', async () => {
    const updatedPower: Power = {
      id: 1,
      kwh: 120,
      date: new Date().toISOString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockHttpClient.put.and.returnValue(of(updatedPower));

    let rcvPower = await service
      .updatePowerById(1, {} as unknown as PowerInput)
      .toPromise();

    expect(rcvPower).toBe(updatedPower);
  });
});
