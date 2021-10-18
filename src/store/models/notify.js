const state = {
  notifyMessage: '',
  notifyType: '',
  notifyOpen: false,
};

const clearMessage = {
  message: '',
  type: '',
  open: false,
};

const notify = {
  name: 'notify',
  state,
  reducers: {
    updateMessage(state, { open, message, type }) {
      return {
        ...state,
        notifyOpen: open,
        notifyMessage: message,
        notifyType: type,
      };
    },
  },
  effects: (dispatch) => ({
    createMessage(payload) {
      dispatch.notify.updateMessage(payload);

      setTimeout(() => {
        this.closeMessage();
      }, 3000);
    },
    closeMessage() {
      dispatch.notify.updateMessage(clearMessage);
    },
  }),
};

export default notify;
