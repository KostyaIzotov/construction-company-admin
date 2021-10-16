const isOpenDrawer = JSON.parse(localStorage.getItem('isOpenDrawer'));
const state = {
  isOpenDrawer,
  routeName: 'Главная',
};

const layout = {
  name: 'layout',
  state,
  reducers: {
    updateShowDrawerLayout(state, payload) {
      return {
        ...state,
        isOpenDrawer: payload,
      };
    },
    updateRouteName(state, payload) {
      return {
        ...state,
        routeName: payload,
      };
    },
  },
  effects: (dispatch) => ({
    toggleShowLayout(payload) {
      localStorage.setItem('isOpenDrawer', payload);
      dispatch.layout.updateShowDrawerLayout(payload);
    },
  }),
};

export default layout;
