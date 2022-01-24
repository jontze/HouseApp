import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { fetchOilList } from 'src/app/store/oil/oil.action';
import { fetchPowerList } from 'src/app/store/power/power.action';
import { fetchWaterList } from 'src/app/store/water/water.action';
import { ResourceResolver } from './resource.resolver';

describe('ResourceResolver', () => {
  let resolver: ResourceResolver;
  let mockStoreService: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockStoreService = jasmine.createSpyObj('Sore', ['dispatch']);

    TestBed.configureTestingModule({
      providers: [
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

  it('should dispatch fetch actions', async () => {
    const resolverReturn = await resolver.resolve().toPromise();
    expect(resolverReturn).toBeTrue();
    expect(mockStoreService.dispatch).toHaveBeenCalledWith(fetchOilList());
    expect(mockStoreService.dispatch).toHaveBeenCalledWith(fetchWaterList());
    expect(mockStoreService.dispatch).toHaveBeenCalledWith(fetchPowerList());
    expect(mockStoreService.dispatch).toHaveBeenCalledTimes(3);
  });
});
