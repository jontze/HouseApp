import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiBackendService } from 'src/app/core/services/api-backend.service';
import {
  fetchPowerList,
  retrievedPowerList,
  retrievePowerListFailed,
} from './power.action';

@Injectable({ providedIn: 'root' })
export class PowerEffects {
  loadOil$ = createEffect(() =>
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

  constructor(
    private readonly actions$: Actions,
    private readonly apiService: ApiBackendService
  ) {}
}
