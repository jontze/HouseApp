import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { retrievedOilList } from 'src/app/store/oil/oil.action';
import { retrievedPowerList } from 'src/app/store/power/power.action';
import { retrievedWaterList } from 'src/app/store/water/water.action';
import { ApiBackendService } from '../services/api-backend.service';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<boolean> {
  constructor(
    private readonly apiService: ApiBackendService,
    private readonly store: Store
  ) {}

  resolve(): Observable<boolean> {
    return forkJoin([
      this.apiService.fetchOil(),
      this.apiService.fetchPower(),
      this.apiService.fetchWater(),
    ]).pipe(
      map(([oil, power, water]) => {
        this.store.dispatch(retrievedOilList({ oil }));
        this.store.dispatch(retrievedWaterList({ water }));
        this.store.dispatch(retrievedPowerList({ power }));
        return true;
      })
    );
  }
}
