import { getBusiness, getNumbers, getNumbersCategory, getStars, getReviews, getHours, getCheckIns, getAttributes } from '../services/rest'

export default {
  namespace: 'portal',
  state: {
    method: 'state',
    category: 'all'
  },
  effects: {
    *getStars({ }, { call, put, select }) {
      let category = yield select(state => state.portal.category);
      let result = yield call(getStars, category);
      yield put({ type: 'updateStars', payload: result })
    },
    *getNumbers({ }, { call, put, select }) {
      let category = yield select(state => state.portal.category);
      let result = yield call(getNumbers, category);
      yield put({ type: 'updateNumbers', payload: result })
    },
    *getBusiness({ }, { call, put, select }) {
      let category = yield select(state => state.portal.category);
      let result = yield call(getBusiness, category);
      yield put({ type: 'updateBusiness', payload: result })
    },
    *getAttributes({ }, { call, put, select }) {
      let target = yield select(state => state.portal.target);
      let state
      if (target !== undefined) {
        state = target.statecode;
      } else {
        state = 'all';
      }
      let category = yield select(state => state.portal.category);

      let result = yield call(getAttributes, state, category);
      yield put({ type: 'updateAttributes', payload: result })
    },
    *getHours({ }, { call, put, select }) {
      let target = yield select(state => state.portal.target);
      let state
      if (target !== undefined) {
        state = target.statecode;
      } else {
        state = 'all';
      }
      let category = yield select(state => state.portal.category);

      let result = yield call(getHours, state, category);
      yield put({ type: 'updateHours', payload: result })
    },
    *getNumbersCategory({ }, { call, put, select }) {
      let target = yield select(state => state.portal.target);
      let state
      if (target !== undefined) {
        state = target.statecode;
      } else {
        state = 'all';
      }
      let result = yield call(getNumbersCategory, state);
      yield put({ type: 'updateNumbersCategory', payload: result })
    }


  },
  reducers: {
    updateStars(state, { payload }) {
      return { ...state, stars: payload, update: {} };
    },
    updateNumbers(state, { payload }) {
      return { ...state, numbers: payload, update: {} };
    },
    updateBusiness(state, { payload }) {
      return { ...state, business: payload, update: {} };
    },
    updateAttributes(state, { payload }) {
      return { ...state, attributes: payload };
    },
    updateHours(state, { payload }) {
      return { ...state, hours: payload };
    },
    updateNumbersCategory(state, { payload }) {
      return { ...state, numbersCategory: payload };
    },

    updateMethod(state, { payload: method }) {
      return { ...state, method: method }
    },
    updateCategory(state, { payloau: category }) {
      return { ...state, category: category }
    },
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
    }
  }
}