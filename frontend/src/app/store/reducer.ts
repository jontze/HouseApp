import { ActionReducerMap, createReducer, MetaReducer, on } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { Oil, Power, Water } from '../core/services/classes/api-backend';
import {
  removeDeletedOil,
  replaceOilWithNew,
  retrievedOilList,
} from './oil/oil.action';
import {
  retrievedPowerList,
  removeDeletedPower,
  replacePowerWithNew,
} from './power/power.action';
import {
  removeDeletedWater,
  replaceWaterWithNew,
  retrievedWaterList,
} from './water/water.action';

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
  on(retrievedWaterList, (state, { water }) => water),
  on(removeDeletedWater, (state, { id }) =>
    state.filter((water) => water.id !== id)
  ),
  on(replaceWaterWithNew, (state, { updated }) =>
    state.filter((water) => (water.id === updated.id ? updated : water))
  )
);

export const oilReducer = createReducer(
  initialOilListState,
  on(retrievedOilList, (state, { oil }) => oil),
  on(removeDeletedOil, (state, { id }) => state.filter((oil) => oil.id !== id)),
  on(replaceOilWithNew, (state, { updated }) =>
    state.filter((oil) => (oil.id === updated.id ? updated : oil))
  )
);

export const powerReducer = createReducer(
  initialPowerListState,
  on(retrievedPowerList, (state, { power }) => power),
  on(removeDeletedPower, (state, { id }) =>
    state.filter((power) => power.id !== id)
  ),
  on(replacePowerWithNew, (state, { updated }) =>
    state.filter((power) => (power.id === updated.id ? updated : power))
  )
);

export const reducers: ActionReducerMap<RootState> = {
  water: waterReducer,
  power: powerReducer,
  oil: oilReducer,
};

export const metaReducers: MetaReducer<RootState>[] = !environment.production
  ? []
  : [];
