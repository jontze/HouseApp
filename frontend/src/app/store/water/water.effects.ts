import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiBackendService } from '../../core/services/api-backend.service';
import {
  fetchWaterList,
  retrievedWaterList,
  retrieveWaterListFailed,
} from './water.action';

@Injectable({ providedIn: 'root' })
export class WaterEffects {
  loadWater$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchWaterList),
      mergeMap(() =>
        this.apiService.fetchWater().pipe(
          map((water) => retrievedWaterList({ water })),
          catchError(() => of(retrieveWaterListFailed))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiBackendService
  ) {}
}
