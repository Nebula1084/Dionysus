import { getBusiness, getNumbers, getNumbersCategory, getStars, getReviews, getHours, getCheckIns, getAttributes } from '../services/rest'

export default {
    namespace: 'portal',
    state: {

    },
    effects: {
        *getStars({ payload: category }, { call, put, select }) {
            let result = yield call(getStars, category);
            yield put({ type: 'updateStars', payload: result })
        },
        *getNumbers({ payload: category }, { call, put, select }) {
            let result = yield call(getNumbers, category);
            yield put({ type: 'updateNumbers', payload: result })
        },
        *getBusiness({ payload: category }, { call, put, select }) {
            let result = yield call(getBusiness, category);
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