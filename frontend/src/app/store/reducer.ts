import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Oil, Power, Water } from '../core/services/classes/api-backend';
import { retrievedOilList } from './oil/oil.action';
import { retrievedPowerList } from './power/power.action';
import { retrievedWaterList } from './water/water.action';

export interface RootState {
  water: ReadonlyArray<Water>;
  power: ReadonlyArray<Power>;
  oil: ReadonlyArray<Oil>;
}

export const initialWaterListState: ReadonlyArray<Water> = [];
export const initialOilListState: ReadonlyArray<Oil> = [];
export const initialPowerListState: ReadonlyArray<Power> = [];

export const waterReducer = createReducer(
  initialWaterListState,
  on(retrievedWaterList, (state, { water }) => water)
);

export const oilReducer = createReducer(
  initialOilListState,
  on(retrievedOilList, (state, { oil }) => oil)
);

export const powerReducer = createReducer(
  initialPowerListState,
  on(retrievedPowerList, (state, { power }) => power)
);

export const reducers: ActionReducerMap<RootState> = {
  water: waterReducer,
  power: powerReducer,
  oil: oilReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? []
  : [];
