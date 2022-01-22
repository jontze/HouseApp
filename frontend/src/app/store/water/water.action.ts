import { createAction, props } from '@ngrx/store';
import { Water } from 'src/app/core/services/classes/api-backend';

export const retrievedWaterList = createAction(
  '[Water] Retrieve Water List Success',
  props<{ water: ReadonlyArray<Water> }>()
);
