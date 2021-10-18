import { companies as companiesData } from '../../resources/mockedData';
import { editList } from '../../resources/utils';

const state = {
  companiesList: [],
  loadingCompaniesList: true,
};

const companies = {
  name: 'companies',
  state,
  reducers: {
    updateCompaniesList(state, payload) {
      return {
        ...state,
        companiesList: payload,
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        loadingCompaniesList: payload,
      };
    },
  },
  effects: (dispatch) => ({
    getCompaniesList() {
      dispatch.companies.setLoading(true);

      try {
        setTimeout(() => {
          dispatch.companies.updateCompaniesList(companiesData);
          dispatch.companies.setLoading(false);
        }, 1000);
      } finally {
        // dispatch.companies.setLoading(false);
      }
    },
    addCompany(payload, { companies: { companiesList } }) {
      try {
        dispatch.companies.updateCompaniesList([payload, ...companiesList]);
        dispatch.notify.createMessage({
          message: 'Компания успешно добавлена!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при добавлении компании!',
          type: 'error',
          open: true,
        });
      }
    },
    editCompany(payload, { companies: { companiesList } }) {
      try {
        dispatch.companies.updateCompaniesList(
          editList(payload, companiesList)
        );
        dispatch.notify.createMessage({
          message: 'Компания успешно отредактирована!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при редактировании компании!',
          type: 'error',
          open: true,
        });
      }
    },
    deleteCompany(id, { companies: { companiesList } }) {
      try {
        dispatch.companies.updateCompaniesList(
          companiesList.filter((el) => el.id !== id)
        );
        dispatch.notify.createMessage({
          message: 'Компания успешно уделена!',
          type: 'success',
          open: true,
        });
      } catch (e) {
        dispatch.notify.createMessage({
          message: 'Ошибка при удалении компании!',
          type: 'error',
          open: true,
        });
      }
    },
  }),
};

export default companies;
