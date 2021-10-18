import { instruments as instrumentsData } from '../../resources/mockedData';
import { editList } from '../../resources/utils';

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
        }, 1000);
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

        dispatch.notify.createMessage({
          message: 'Инструмент успешно добавлен!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при добавлении инструмента!',
          type: 'error',
          open: true,
        });
      }
    },
    editInstrument(payload, { instruments: { instrumentsList } }) {
      try {
        dispatch.instruments.updateInstrumentsList(
          editList(payload, instrumentsList)
        );
        dispatch.notify.createMessage({
          message: 'Инструмент успешно отредактирован!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при редактировании инструмента!',
          type: 'error',
          open: true,
        });
      }
    },
    deleteInstruments(id, { instruments: { instrumentsList } }) {
      try {
        dispatch.instruments.updateInstrumentsList(
          instrumentsList.filter((el) => el.id !== id)
        );

        dispatch.notify.createMessage({
          message: 'Инстумент успешно удален!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при удалении инструмента!',
          type: 'error',
          open: true,
        });
      }
    },
  }),
};

export default instruments;
