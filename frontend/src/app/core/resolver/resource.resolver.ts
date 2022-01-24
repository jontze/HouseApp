import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { fetchOilList } from 'src/app/store/oil/oil.action';
import { fetchPowerList } from 'src/app/store/power/power.action';
import { fetchWaterList } from 'src/app/store/water/water.action';

@Injectable({
  providedIn: 'root',
})
export class ResourceResolver implements Resolve<boolean> {
  constructor(private readonly store: Store) {}

  resolve(): Observable<boolean> {
    this.store.dispatch(fetchOilList());
    this.store.dispatch(fetchWaterList());
    this.store.dispatch(fetchPowerList());
    return of(true);
  }
}
