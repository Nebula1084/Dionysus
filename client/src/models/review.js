import { getReviews, getCheckIns } from '../services/rest'

export default {
  namespace: 'review',
  state: {
  },
  effects: {
    *getReviews({ }, { call, put, select }) {
      let category = 'all';

      let result = yield call(getReviews, category);
      yield put({ type: 'updateReviews', payload: result })
    },
    *getCheckIns({ }, { call, put, select }) {
      let target = yield select(state => state.review.target);
      let state
      if (target !== undefined) {
        state = target.statecode;
      } else {
        state = 'all';
      }
      let category = 'all';

      let result = yield call(getCheckIns, state, category);
      yield put({ type: 'updateCheckIns', payload: result })
    }
  },
  reducers: {
    updateState(state, { payload: target }) {
      if (state.target) {
        state.target.selected = false;
      }
      if (state.target !== target) {
        target.selected = true;
        return { ...state, target: target };
      } else {
        return { ...state, target: undefined };
      }
    },
    updateReviews(state, { payload }) {
      return { ...state, reviews: payload, update: {} };
    },
    updateCheckIns(state, { payload }) {
      return { ...state, checkIns: payload };
    }
  }
}