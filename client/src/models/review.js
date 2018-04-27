import { getStars, getNumbers, getStarsCategory, getNumbersCategory, getBusiness, getBusinessCategory } from '../services/rest'

export default {
  namespace: 'review',
  state: {

  },
  effects: {
    *getStars({ payload: category }, { call, put, select }) {
      let result;
      if (category == 'all')
        result = yield call(getStars);
      else
        result = yield call(getStarsCategory, category);
      yield put({ type: 'updateStars', payload: result })
    },
    *getNumbers({ payload: category }, { call, put, select }) {
      let result;
      if (category == 'all')
        result = yield call(getNumbers);
      else
        result = yield call(getNumbersCategory, category);

      yield put({ type: 'updateNumbers', payload: result })
    },
    *getBusiness({ payload: category }, { call, put, select }) {
      let result;
      if (category == 'all')
        result = yield call(getBusiness);
      else
        result = yield call(getBusinessCategory, category);

      yield put({ type: 'updateBusiness', payload: result })
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
    }
  }
}