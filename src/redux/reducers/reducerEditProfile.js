import * as types from '../types';

const initialState = {
  isLoading: true,
  isError: false,
  data: [],
};

export default function updateProfile(state = initialState, action) {
  switch (action.type) {
    case `${types.UPDATE_PROFILE}`:
      console.log('LOADING');
      return {
        ...state,
        data: action.payload,
        isLoading: true,
        isError: false,
      };
    case `${types.UPDATE_PROFILE}_FULFILLED`:
      console.log('DATA OK');
      return {
        ...state,
        data: action.payload.data,
        isLoading: false,
      };
    case `${types.UPDATE_PROFILE}_REJECTED`:
      console.log('ERROR');
      return {...state, isError: true, isLoading: false};
    default:
      return state;
  }
}
