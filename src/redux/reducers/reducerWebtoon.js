import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const reducerGetMyWebtoon = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_MY_WEBTOON}`:
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case `${types.GET_MY_WEBTOON}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        data: action.payload.data,
      };
    case `${types.GET_MY_WEBTOON}_REJECTED`:
      return {...state, isError: true};
    default:
      return state;
  }
};
