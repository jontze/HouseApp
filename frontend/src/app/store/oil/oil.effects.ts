import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiBackendService } from '../../core/services/api-backend.service';
import {
  deleteOilById,
  deleteOilFailed,
  fetchOilList,
  removeDeletedOil,
  replaceOilWithNew,
  retrievedOilList,
  retrieveOilListFailed,
  updateOil,
  updateOilFailed,
} from './oil.action';

@Injectable({ providedIn: 'root' })
export class OilEffects {
  loadOil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchOilList),
      mergeMap(() =>
        this.apiService.fetchOil().pipe(
          map((oil) => retrievedOilList({ oil })),
          catchError(() => of(retrieveOilListFailed))
        )
      )
    )
  );

  dropOilById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteOilById),
      mergeMap(({ id }) =>
        this.apiService.dropOilById(id).pipe(
          map(
            () => removeDeletedOil({ id }),
            catchError(() => of(deleteOilFailed))
          )
        )
      )
    )
  );

  updateOil$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateOil),
      mergeMap(({ id, input }) =>
        this.apiService.updateOilById(id, input).pipe(
          map(
            (updated) => replaceOilWithNew({ updated }),
            catchError(() => of(updateOilFailed))
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
