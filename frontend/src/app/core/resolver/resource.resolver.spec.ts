import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ApiBackendService } from '../services/api-backend.service';
import { Oil, Power, Water } from '../services/classes/api-backend';

import { ResourceResolver } from './resource.resolver';

describe('ResourceResolver', () => {
  let resolver: ResourceResolver;
  let mockApiService: jasmine.SpyObj<ApiBackendService>;
  let mockStoreService: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiBackendService', [
      'fetchOil',
      'fetchPower',
      'fetchWater',
    ]);
    mockStoreService = jasmine.createSpyObj('Sore', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
        {
          provide: ApiBackendService,
          useValue: mockApiService,
        },
        {
          provide: Store,
          useValue: mockStoreService,
        },
      ],
    });
    resolver = TestBed.inject(ResourceResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should fetch resources and update store with data', async () => {
    mockApiService.fetchOil.and.returnValue(of([] as unknown as Oil[]));
    mockApiService.fetchPower.and.returnValue(of([] as unknown as Power[]));
    mockApiService.fetchWater.and.returnValue(of([] as unknown as Water[]));
    const resolverReturn = await resolver.resolve().toPromise();
    expect(resolverReturn).toBeTrue();
    expect(mockApiService.fetchOil).toHaveBeenCalledTimes(1);
    expect(mockApiService.fetchPower).toHaveBeenCalledTimes(1);
    expect(mockApiService.fetchWater).toHaveBeenCalledTimes(1);
  });
});
