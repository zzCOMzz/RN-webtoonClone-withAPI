import * as types from '../types';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};

export const reducerGetMyEpisode = (state = initialState, action) => {
  switch (action.type) {
    case `${types.GET_MY_EPISODE}`:
      return {
        ...state,
        isSuccess: false,
        isLoading: true,
        data: action.payload,
      };
    case `${types.GET_MY_EPISODE}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        data: action.payload.data,
        isSuccess: true,
      };
    case `${types.GET_MY_EPISODE}_REJECTED`:
      return {
        ...state,
        isError: true,
        isLoading: false,
      };
    default:
      return state;
  }
};

const initStateImage = {
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
};
export const getDetailMyEpisode = (state = initStateImage, action) => {
  switch (action.type) {
    case `${types.GET_MY_EPIDOSE_IMAGE}`:
      return {
        ...state,
        isLoading: true,
        data: action.payload,
      };
    case `${types.GET_MY_EPIDOSE_IMAGE}_FULFILLED`:
      return {
        ...state,
        isSuccess: true,
        data: action.payload.data,
        isLoading: false,
      };
    case `${types.GET_MY_EPIDOSE_IMAGE}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.payload,
      };
    default:
      return state;
  }
};
