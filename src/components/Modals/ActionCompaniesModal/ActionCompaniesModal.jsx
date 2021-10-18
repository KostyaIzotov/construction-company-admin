import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, DialogActions, Grid, Box } from '@mui/material';

import LabelInput from '../../Elements/Inputs/LabelInput';
import ButtonConfirmModal from '../../Elements/Buttons/ButtonConfirmModal';
import ModalTitle from '../ModalTitle';
import Transition from '../Transition';

const ActionCompaniesModal = ({
  open,
  setOpen,
  data,
  addCompany,
  editCompany,
}) => {
  const classes = useStyles();
  const startValue = useMemo(
    () => ({
      name: '',
      password: '',
    }),
    []
  );

  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [company, setCompany] = useState(startValue);

  useEffect(() => {
    data ? setCompany(data) : setCompany(startValue);
  }, [data, startValue]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let nameErr = nameError,
      passwordErr = passwordError;

    nameErr =
      company.name.length <= 1
        ? 'Название должно содержать минимум 2 символа!'
        : '';

    passwordErr =
      company.password.length <= 5
        ? 'Пароль должен содержать минимум 6 символов!'
        : '';

    setNameError(nameErr);
    setPasswordError(passwordErr);

    if (!!nameErr || !!passwordErr) return;

    data ? editCompany(company) : addCompany(company);
    setCompany(startValue);
  };

  const setValue = (field, value) => {
    setCompany({ ...company, [field]: value });
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
          Добавление компании
        </ModalTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <Grid container direction='row'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput
                  value={company.name}
                  setValue={(val) => setValue('name', val)}
                  label='Название'
                  error={nameError}
                />
              </Grid>
              <Grid item xs={6}>
                <LabelInput
                  value={company.password}
                  setValue={(val) => setValue('password', val)}
                  label='Пароль'
                  error={passwordError}
                  type='password'
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

const mapDispatch = ({ companies }) => ({
  addCompany: (company) => companies.addCompany(company),
  editCompany: (company) => companies.editCompany(company),
});

export default connect(null, mapDispatch)(ActionCompaniesModal);
