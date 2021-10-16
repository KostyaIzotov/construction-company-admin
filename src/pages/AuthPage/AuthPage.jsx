import React, { useState } from 'react';
import { connect } from 'react-redux';

import { Grid, Box, Typography, Button, Checkbox } from '@mui/material';
import LabelInput from '../../components/Elements/Inputs/LabelInput';
import propStyles from '../../resources/propStyles';
import ActionGrayLabel from '../../components/Elements/ActionGrayLabel';

const AuthPage = ({ updateAuthStatus }) => {
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneErr] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saveData, setSaveData] = useState(false);

  const authUser = (e) => {
    e.preventDefault();

    let phoneErr = phone,
      passwordErr = password;

    phoneErr =
      phone.length <= 10
        ? 'Минимальная длина номера телефона 10 символов!'
        : '';

    passwordErr =
      password.length < 6 ? 'Минимальная длина пароля 6 символов!' : '';

    setPhoneErr(phoneErr);
    setPasswordError(passwordErr);

    if (!!phoneErr || !!passwordErr) return;

    updateAuthStatus(true);
  };

  return (
    <form onSubmit={authUser}>
      <Grid
        sx={{ height: '100vh' }}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Box
          sx={{
            boxShadow: '0 0 35px 0 rgb(154 161 171 / 15%);',
          }}
          borderRadius={1}
          bgcolor='#fff'
          width='440px'
          padding='50px'
        >
          <Box mb={2}>
            <Typography
              color={propStyles.inputLabelColor}
              fontSize={22}
              textAlign='center'
              gutterBottom
              fontWeight='bolder'
            >
              Авторизация
            </Typography>
          </Box>
          <Box mb={2}>
            <LabelInput
              value={phone}
              setValue={setPhone}
              error={phoneError}
              label={'Телефон'}
            />
          </Box>
          <Box>
            <LabelInput
              value={password}
              setValue={setPassword}
              error={passwordError}
              type={'password'}
              label={'Пароль'}
            />
          </Box>
          <Grid
            container
            justifyContent='space-between'
            alignItems='center'
            sx={{ my: 2 }}
          >
            <Box
              sx={{ userSelect: 'none' }}
              onClick={() => setSaveData(!saveData)}
            >
              <Checkbox
                value={saveData}
                checked={saveData}
                sx={{
                  color: propStyles.greenColor,
                  '&.Mui-checked': {
                    color: propStyles.greenColor,
                  },
                }}
              />
              <ActionGrayLabel label='Запомнить данные' />
            </Box>
            <ActionGrayLabel label='Забыли пароль?' />
          </Grid>
          <Box>
            <Button
              sx={{
                fontWeight: 'bolder',
                bgcolor: propStyles.greenColor,
                height: 50,
                borderRadius: '14px',
                '&:hover': {
                  bgcolor: propStyles.greenColor,
                  opacity: 0.7,
                },
              }}
              fullWidth
              variant='contained'
              type='submit'
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Grid>
    </form>
  );
};

const mapDispatch = (dispatch) => ({
  updateAuthStatus: (status) => dispatch.auth.updateAuthStatus(status),
});

export default connect(null, mapDispatch)(AuthPage);
