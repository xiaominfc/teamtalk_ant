import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';

import { QueryAction, QueryActionInf } from './service';

import { UserData, UserItemInf, TableListParams } from './data.d';

export interface StateType<T> {
  data: T;
}

export interface EffectsInf {
  fetch: Effect;
  add: Effect;
  remove: Effect;
  update: Effect;
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export function buildEffects(queryAction:Partial<QueryActionInf>) {
  const effects: EffectsInf = {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryAction.queryRule, payload);
      yield put({
          type: 'save',
          payload: response,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(queryAction.addRule, payload);
      yield put({
        type: 'null',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(queryAction.removeRule, payload);
      yield put({
        type: 'null',
        payload: response,
      });
      if (callback) callback(response);
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(queryAction.updateRule, payload);
      yield put({
        type: 'null',
        payload: response,
      });
      if (callback) callback(response);
    },
  }
  return effects;
}

export interface ModelType<T> {
  namespace: string;
  state: Partial<T>;
  effects: EffectsInf;
  reducers: {
    save: Reducer<Partial<T>>;
  };
}


export function buildModel<T>(queryAction:Partial<QueryActionInf>, namespace:string):ModelType<StateType<T>> {
  const outModel: ModelType<StateType<T>> = {
    namespace,
    state: {},
    effects: buildEffects(queryAction),
    reducers: {
      save(state, action) {
       return {
        ...state,
        data: action.payload,
      };
      },
    },
  };
  return outModel;
}

const queryAction = new QueryAction<UserItemInf, TableListParams>('user');

const Model = buildModel<UserData>(queryAction, 'listUsers');

export default Model;
