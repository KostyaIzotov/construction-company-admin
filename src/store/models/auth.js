const state = {
  isAuth: false,
  loadingAuth: false,
};

const auth = {
  name: 'auth',
  state,
  reducers: {
    updateAuthStatus(state, payload) {
      return {
        ...state,
        isAuth: payload,
      };
    },
  },
  effects: (dispatch) => ({
    changeAuthStatus(payload, state) {
      console.log(state.count.count);
      dispatch.auth.updateAuthStatus(payload);
    },
  }),
};

export default auth;
