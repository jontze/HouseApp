import { createAction, props } from '@ngrx/store';
import { Power, PowerInput } from 'src/app/core/services/classes/api-backend';

export const fetchPowerList = createAction('[Power] Init List Loading');

export const retrievedPowerList = createAction(
  '[Power] Retrieve Power List Success',
  props<{ power: ReadonlyArray<Power> }>()
);

export const retrievePowerListFailed = createAction(
  '[Power] Retrieving List Failed'
);

export const deletePowerById = createAction(
  '[Power] Delete by id',
  props<{ id: number }>()
);

export const removeDeletedPower = createAction(
  '[Power] Remove deleted power from collection',
  props<{ id: number }>()
);

export const deletePowerFailed = createAction(
  '[Power] Failed to remove power, keep in collection'
);

export const updatePower = createAction(
  '[Power] Update with new values',
  props<{ id: number; input: PowerInput }>()
);

export const replacePowerWithNew = createAction(
  '[Power] Replace store with updated data',
  props<{ updated: Power }>()
);

export const updatePowerFailed = createAction(
  '[Water] Failed to update with new values'
);
