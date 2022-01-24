import { createAction, props } from '@ngrx/store';
import { Power } from 'src/app/core/services/classes/api-backend';

export const fetchPowerList = createAction('[Power] Init List Loading');

export const retrievedPowerList = createAction(
  '[Power] Retrieve Power List Success',
  props<{ power: ReadonlyArray<Power> }>()
);

export const retrievePowerListFailed = createAction(
  '[Power] Retrieving List Failed'
);
