import React from 'react';

import { Button } from '@mui/material';
import propStyles from '../../../../resources/propStyles';

const ButtonConfirmModal = () => {
  return (
    <Button sx={{ color: propStyles.greenColor }} type='submit' autoFocus>
      Сохранить
    </Button>
  );
};

export default ButtonConfirmModal;
