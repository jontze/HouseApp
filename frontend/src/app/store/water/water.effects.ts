import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiBackendService } from '../../core/services/api-backend.service';
import {
  deleteWaterById,
  deleteWaterFailed,
  fetchWaterList,
  removeDeletedWater,
  replaceWaterWithNew,
  retrievedWaterList,
  retrieveWaterListFailed,
  updateWater,
  updateWaterFailed,
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

  dropWaterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteWaterById),
      mergeMap(({ id }) =>
        this.apiService.dropWaterById(id).pipe(
          map(() => removeDeletedWater({ id })),
          catchError(() => of(deleteWaterFailed))
        )
      )
    )
  );

  updateWater$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWater),
      mergeMap(({ id, input }) =>
        this.apiService.updateWaterById(id, input).pipe(
          map((updated) => replaceWaterWithNew({ updated })),
          catchError(() => of(updateWaterFailed))
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiBackendService
  ) {}
}
