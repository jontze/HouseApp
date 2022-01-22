import { createAction, props } from '@ngrx/store';
import { Power } from 'src/app/core/services/classes/api-backend';

export const retrievedPowerList = createAction(
  '[Power] Retrieve Power List Success',
  props<{ power: ReadonlyArray<Power> }>()
);
