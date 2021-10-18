const state = {
  isAuth: false,
  loadingAuth: true,
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
    setLoading(state, payload) {
      return {
        ...state,
        loadingAuth: payload,
      };
    },
  },
  effects: (dispatch) => ({
    loginUser({ phone, password, saveData }) {
      dispatch.notify.closeMessage();
      try {
        if (phone === '111111111111' && password === '123123') {
          dispatch.auth.updateAuthStatus(true);
          localStorage.setItem('isAuth', true);

          if (saveData) {
            localStorage.setItem(
              'userAuthData',
              JSON.stringify({ phone, password, saveData })
            );
          } else {
            localStorage.removeItem('userAuthData');
          }
        } else {
          throw new Error('Неверный телефон или пароль!');
        }
      } catch (e) {
        dispatch.notify.createMessage({
          message: e.message,
          type: 'error',
          open: true,
        });
      }
    },
    checkAuthUser() {
      dispatch.auth.setLoading(true);
      try {
        if (localStorage.getItem('isAuth')) {
          dispatch.auth.updateAuthStatus(true);
        } else {
          this.logoutUser();
        }
      } finally {
        dispatch.auth.setLoading(false);
      }
    },
    logoutUser() {
      localStorage.removeItem('isAuth');
      dispatch.auth.updateAuthStatus(false);
    },
  }),
};

export default auth;
