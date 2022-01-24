import { createAction, props } from '@ngrx/store';
import { Oil, OilInput } from 'src/app/core/services/classes/api-backend';

export const fetchOilList = createAction('[Oil] Init List Loading');

export const retrievedOilList = createAction(
  '[Oil] Retrieve Oil List Success',
  props<{ oil: ReadonlyArray<Oil> }>()
);

export const retrieveOilListFailed = createAction(
  '[Oil] Retrieving Oil List Failed'
);

export const deleteOilById = createAction(
  '[Oil] Delete By Id',
  props<{ id: number }>()
);

export const removeDeletedOil = createAction(
  '[Oil] Remove deleted oil from collection',
  props<{ id: number }>()
);

export const deleteOilFailed = createAction(
  '[Oil] Failed to remove oil, keep in collection'
);

export const updateOil = createAction(
  '[Oil] Update with new values',
  props<{ id: number; input: OilInput }>()
);

export const replaceOilWithNew = createAction(
  '[Oil] Replace store with updated data ',
  props<{ updated: Oil }>()
);

export const updateOilFailed = createAction(
  '[Oil] Failed to update with new values'
);
