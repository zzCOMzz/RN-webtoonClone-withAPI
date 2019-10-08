export const initLoginState = {
  isLoading: false,
  isLogin: false,
  data: [],
  userData: {},
  count: 0,
};

export const LoginReducer = (state = initLoginState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        count: state.count + 1,
      };
  }
};
