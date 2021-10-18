import React from 'react';
import { connect } from 'react-redux';

import { Snackbar, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Transition from '../Modals/Transition';
import propStyles from '../../resources/propStyles';

const Notify = ({ handleClose, notifyMessage, notifyType, notifyOpen }) => {
  return (
    <Snackbar
      TransitionComponent={Transition}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={notifyOpen}
      onClose={handleClose}
      key='Nofify'
    >
      <Alert
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={handleClose}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        variant='filled'
        severity={notifyType || 'info'}
        sx={{
          width: '100%',
          bgcolor: notifyType === 'success' ? propStyles.greenColor : null,
        }}
      >
        {notifyMessage}
      </Alert>
    </Snackbar>
  );
};

const mapState = ({ notify: { notifyMessage, notifyType, notifyOpen } }) => ({
  notifyMessage,
  notifyType,
  notifyOpen,
});

const mapDispatch = ({ notify: { closeMessage } }) => ({
  handleClose: () => closeMessage(),
});

export default connect(mapState, mapDispatch)(Notify);
