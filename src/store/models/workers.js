import { workers as workersData } from '../../resources/mockedData';
import { editList } from '../../resources/utils';

const state = {
  workersList: [],
  loadingWorkersList: true,
};

const workers = {
  name: 'workers',
  state,
  reducers: {
    updateWorkersList(state, payload) {
      return {
        ...state,
        workersList: payload,
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        loadingWorkersList: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getWorkersList() {
      dispatch.workers.setLoading(true);

      try {
        setTimeout(() => {
          dispatch.workers.updateWorkersList(workersData);
          dispatch.workers.setLoading(false);
        }, 1000);
      } catch (e) {
      } finally {
        // dispatch.workers.setLoading(false);
      }
    },
    addWorker(payload, { workers: { workersList } }) {
      try {
        dispatch.workers.updateWorkersList([payload, ...workersList]);

        dispatch.notify.createMessage({
          message: 'Работник успешно добавлен!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при добавлении работника',
          type: 'error',
          open: true,
        });
      }
    },
    editWorker(payload, { workers: { workersList } }) {
      try {
        dispatch.workers.updateWorkersList(editList(payload, workersList));
        dispatch.notify.createMessage({
          message: 'Работник успешно отредактирован!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при редактировании работника!',
          type: 'error',
          open: true,
        });
      }
    },
    deleteWorker(id, { workers: { workersList } }) {
      try {
        dispatch.workers.updateWorkersList(
          workersList.filter((el) => el.id !== id)
        );

        dispatch.notify.createMessage({
          message: 'Работник успешно удален!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при удалении работника!',
          type: 'error',
          open: true,
        });
      }
    },
  }),
};

export default workers;
