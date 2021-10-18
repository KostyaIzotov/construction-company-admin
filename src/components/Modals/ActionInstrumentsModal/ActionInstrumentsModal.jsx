import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

import LabelInput from '../../Elements/Inputs/LabelInput';
import ButtonConfirmModal from '../../Elements/Buttons/ButtonConfirmModal';
import ModalTitle from '../ModalTitle';
import Transition from '../Transition';

const ActionInstrumentsModal = ({
  open,
  setOpen,
  addInstrument,
  editInstrument,
  data,
}) => {
  const classes = useStyles();
  const startValue = useMemo(
    () => ({
      name: '',
      serial: '',
    }),
    []
  );

  const [nameError, setNameError] = useState('');
  const [serialError, setSerialError] = useState('');
  const [instrument, setInstrument] = useState(startValue);

  useEffect(() => {
    data ? setInstrument(data) : setInstrument(startValue);
  }, [data, startValue]);

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

  const setValue = (field, value) => {
    setInstrument({ ...instrument, [field]: value });
  };

  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={() => setOpen(false)}
      aria-labelledby='customized-dialog-title'
      open={open}
      TransitionComponent={Transition}
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
                  setValue={(val) => setValue('name', val)}
                  label='Название'
                  error={nameError}
                />
              </Grid>
              <Grid item xs={6}>
                <LabelInput
                  value={instrument.serial}
                  setValue={(val) => setValue('serial', val)}
                  label='Серийный номер'
                  error={serialError}
                />
              </Grid>
              <Box width='100%' mt={2}>
                {instrument.stories?.length ? (
                  <TableContainer component={Paper}>
                    <Table size='medium' aria-label='simple table'>
                      <TableHead>
                        <TableRow>
                          <TableCell align='center'>Сотрудник</TableCell>
                          <TableCell align='center'>Получение</TableCell>
                          <TableCell align='center'>Сдача</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {instrument.stories.map((el) => (
                          <TableRow>
                            <TableCell align='center'>Иван иванов</TableCell>
                            <TableCell align='center'>22.12.2021</TableCell>
                            <TableCell align='center'>25.12.2021</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : null}
              </Box>
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
