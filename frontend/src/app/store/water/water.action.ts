import { createAction, props } from '@ngrx/store';
import { Water } from 'src/app/core/services/classes/api-backend';

export const fetchWaterList = createAction('[Water] Init List Loading');

export const retrievedWaterList = createAction(
  '[Water] Retrieve Water List Success',
  props<{ water: ReadonlyArray<Water> }>()
);

export const retrieveWaterListFailed = createAction(
  '[Water] Retrieving List Failed'
);
