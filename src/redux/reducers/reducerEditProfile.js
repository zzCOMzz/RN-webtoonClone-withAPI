import * as types from '../types';

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  data: [],
};

export default function updateProfile(state = initialState, action) {
  switch (action.type) {
    case `${types.UPDATE_PROFILE}_PENDING`:
      console.log('LOADING');
      return {...state, isLoading: true, isError: false};
    case `${types.UPDATE_PROFILE}_FULFILLED`:
      console.log('DATA OK');
      return {...state, isLoading: false, data: action.payload.data};
    case `${types.UPDATE_PROFILE}_REJECTED`:
      console.log('ERROR');
      return {...state, isError: true};
    default:
      return state;
  }
}
