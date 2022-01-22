import { createAction, props } from '@ngrx/store';
import { Oil } from 'src/app/core/services/classes/api-backend';

export const retrievedOilList = createAction(
  '[Oil] Retrieve Oil List Success',
  props<{ oil: ReadonlyArray<Oil> }>()
);
