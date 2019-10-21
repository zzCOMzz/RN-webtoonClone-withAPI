import * as types from './../types';

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  users: [],
};

export default function reducerTodos(state = initialState, action) {
  switch (action.type) {
    case `${types.GET_USERS}_PENDING`:
      return {
        ...state,
        isLoading: true,
      };

    case `${types.GET_USERS}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        users: action.payload.data.data,
      };

    case `${types.GET_USERS}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
}
