import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, DialogActions, Grid, Box } from '@mui/material';

import LabelInput from '../../Elements/Inputs/LabelInput';
import ButtonConfirmModal from '../../Elements/Buttons/ButtonConfirmModal';
import ModalTitle from '../ModalTitle';
import Transition from '../Transition';

const ActionWorkersModal = ({ open, setOpen, data, addWorker, editWorker }) => {
  const classes = useStyles();
  const startValue = useMemo(
    () => ({
      firstName: '',
      secondName: '',
      phone: '',
      partsCount: 0,
    }),
    []
  );
  const [worker, setWorker] = useState(startValue);
  // fields errors
  const [firstNameError, setFirstNameError] = useState('');
  const [secondNameError, setSecondNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [partsCountError, setPartsCountError] = useState('');

  useEffect(() => {
    data ? setWorker(data) : setWorker(startValue);
  }, [data, startValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let firstNameErr = firstNameError,
      secondNameErr = secondNameError,
      phoneErr = phoneError,
      partsCountErr = partsCountError;

    firstNameErr =
      worker.firstName.length <= 1
        ? 'Имя должно содержать минимум 2 символа!'
        : '';
    secondNameErr =
      worker.secondName.length <= 1
        ? 'Фамлия должна содержать минимум 2 символа!'
        : '';
    phoneErr =
      worker.phone.length <= 11
        ? 'Телефон должен содержать минимум 12 символов'
        : '';
    partsCountErr = !String(worker.partsCount).length
      ? 'Поле не может быть пустым'
      : '';

    setFirstNameError(firstNameErr);
    setSecondNameError(secondNameErr);
    setPhoneError(phoneErr);
    setPartsCountError(partsCountErr);

    const validError =
      !!firstNameErr || !!secondNameErr || !!phoneErr || !!partsCountErr;

    if (validError) return;

    data ? editWorker(worker) : addWorker(worker);
    setWorker(startValue);
  };

  const setValue = (field, value) => {
    setWorker({ ...worker, [field]: value });
  };

  return (
    <Dialog
      TransitionComponent={Transition}
      fullWidth
      maxWidth='sm'
      onClose={() => setOpen(false)}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <form onSubmit={handleSubmit}>
        <ModalTitle onClose={() => setOpen(false)}>
          Добавление работника
        </ModalTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <Grid container direction='row'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput
                  value={worker.firstName}
                  setValue={(val) => setValue('firstName', val)}
                  label='Имя'
                  error={firstNameError}
                />
              </Grid>
              <Grid item xs={6}>
                <LabelInput
                  value={worker.secondName}
                  setValue={(val) => setValue('secondName', val)}
                  label='Фамилия'
                  error={secondNameError}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }} container direction='row'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput
                  value={worker.phone}
                  setValue={(val) => setValue('phone', val)}
                  label='Телефон'
                  error={phoneError}
                />
              </Grid>
              <Grid item xs={6}>
                <LabelInput
                  type='number'
                  value={worker.partsCount}
                  setValue={(val) => setValue('partsCount', val)}
                  label='Кол-во запчастей'
                  error={partsCountError}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <ButtonConfirmModal actionFn={() => setOpen(false)} />
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
  addWorker: (worker) => dispatch.workers.addWorker(worker),
  editWorker: (worker) => dispatch.workers.editWorker(worker),
});

export default connect(null, mapDispatch)(ActionWorkersModal);
