import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import {
  deletePowerById,
  deletePowerFailed,
  fetchPowerList,
  removeDeletedPower,
  replacePowerWithNew,
  retrievedPowerList,
  retrievePowerListFailed,
  updatePower,
  updatePowerFailed,
} from './power.action';

@Injectable({ providedIn: 'root' })
export class PowerEffects {
  loadPower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPowerList),
      mergeMap(() =>
        this.apiService.fetchPower().pipe(
          map(
            (power) => retrievedPowerList({ power }),
            catchError(() => of(retrievePowerListFailed))
          )
        )
      )
    )
  );

  dropPowerById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePowerById),
      mergeMap(({ id }) =>
        this.apiService.dropPowerById(id).pipe(
          map(
            () => removeDeletedPower({ id }),
            catchError(() => of(deletePowerFailed))
          )
        )
      )
    )
  );

  updatePower$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updatePower),
      mergeMap(({ id, input }) =>
        this.apiService.updatePowerById(id, input).pipe(
          map(
            (updated) => replacePowerWithNew({ updated }),
            catchError(() => of(updatePowerFailed))
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiBackendService
  ) {}
}
