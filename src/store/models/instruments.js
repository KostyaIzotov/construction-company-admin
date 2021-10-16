import { instruments as instrumentsData } from '../../resources/mockedData';

const state = {
  instrumentsList: [],
  loadingInstrumentsList: true,
};

const instruments = {
  name: 'instruments',
  state,
  reducers: {
    updateInstrumentsList(state, payload) {
      return {
        ...state,
        instrumentsList: payload,
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        loadingInstrumentsList: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getInstrumentsList() {
      dispatch.instruments.setLoading(true);

      try {
        setTimeout(() => {
          dispatch.instruments.updateInstrumentsList(instrumentsData);
          dispatch.instruments.setLoading(false);
        }, 3000);
      } catch (e) {
      } finally {
        // dispatch.instruments.setLoading(false);
      }
    },
    addInstrument(payload, { instruments: { instrumentsList } }) {
      try {
        dispatch.instruments.updateInstrumentsList([
          payload,
          ...instrumentsList,
        ]);
      } catch (e) {
        console.log(e);
      }
    },
    editInstrument(payload, { instruments: { instrumentsList } }) {
      try {
        const idx = instrumentsList.findIndex((el) => el.id === payload.id),
          instruments = [
            ...instrumentsList.slice(0, idx),
            payload,
            ...instrumentsList.slice(idx + 1),
          ];

        dispatch.instruments.updateInstrumentsList(instruments);
      } catch (e) {}
    },
    deleteInstruments(id, { instruments: { instrumentsList } }) {
      dispatch.instruments.updateInstrumentsList(
        instrumentsList.filter((el) => el.id !== id)
      );
    },
  }),
};

export default instruments;
