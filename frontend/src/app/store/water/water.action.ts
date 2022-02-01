import { createAction, props } from '@ngrx/store';
import { Water, WaterInput } from 'src/app/core/services/classes/api-backend';

export const fetchWaterList = createAction('[Water] Init List Loading');

export const retrievedWaterList = createAction(
  '[Water] Retrieve Water List Success',
  props<{ water: ReadonlyArray<Water> }>()
);

export const retrieveWaterListFailed = createAction(
  '[Water] Retrieving List Failed'
);

export const deleteWaterById = createAction(
  '[Water] Delete by id',
  props<{ id: number }>()
);

export const removeDeletedWater = createAction(
  '[Water] Remove deleted water from collection',
  props<{ id: number }>()
);

export const deleteWaterFailed = createAction(
  '[Water] Failed to remove water, keep in collection'
);

export const updateWater = createAction(
  '[Water] Update with new values',
  props<{ id: number; input: WaterInput }>()
);

export const replaceWaterWithNew = createAction(
  '[Water] Replace store with updated data',
  props<{ updated: Water }>()
);

export const updateWaterFailed = createAction(
  '[Water] Failed to update with new values'
);
