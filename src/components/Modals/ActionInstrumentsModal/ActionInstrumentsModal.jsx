import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, DialogActions, Grid, Box } from '@mui/material';

import LabelInput from '../../Elements/Inputs/LabelInput';
import ButtonConfirmModal from '../../Elements/Buttons/ButtonConfirmModal';
import ModalTitle from '../ModalTitle';

const ActionInstrumentsModal = ({
  open,
  setOpen,
  addInstrument,
  editInstrument,
  data,
}) => {
  const classes = useStyles();
  const startValue = {
    name: '',
    serial: '',
  };

  const [nameError, setNameError] = useState('');
  const [serialError, setSerialError] = useState('');
  const [instrument, setInstrument] = useState(startValue);

  useEffect(() => {
    if (data) {
      setInstrument(data);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let serialErr = serialError,
      nameErr = nameError;

    nameErr =
      instrument.name.length <= 2
        ? 'Название должно содержать минимум 3 символа!'
        : '';

    serialErr =
      instrument.serial.length <= 2
        ? 'Серийный номер должен содержать минимум 3 символа!'
        : '';

    setNameError(nameErr);
    setSerialError(serialErr);

    if (!!nameErr || !!serialErr) return;

    data ? editInstrument(instrument) : addInstrument(instrument);

    setInstrument(startValue);
  };

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={() => setOpen(false)}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <ModalTitle onClose={() => setOpen(false)}>
          Добавление инструмента
        </ModalTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <Grid container direction='row'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput
                  value={instrument.name}
                  setValue={(val) =>
                    setInstrument({ ...instrument, name: val })
                  }
                  label='Название'
                  error={nameError}
                />
              </Grid>
              <Grid item xs={6}>
                <LabelInput
                  value={instrument.serial}
                  setValue={(val) =>
                    setInstrument({ ...instrument, serial: val })
                  }
                  label='Серийный номер'
                  error={serialError}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <ButtonConfirmModal />
        </DialogActions>
      </form>
    </Dialog>
  );
};

const useStyles = makeStyles({
  pr20: {
    paddingRight: 24,
  },
});

const mapDispatch = (dispatch) => ({
  addInstrument: (instrument) => dispatch.instruments.addInstrument(instrument),
  editInstrument: (instrument) =>
    dispatch.instruments.editInstrument(instrument),
});

export default connect(null, mapDispatch)(ActionInstrumentsModal);
