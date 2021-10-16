import React from 'react';

import { Button } from '@mui/material';
import propStyles from '../../../../resources/propStyles';

const ButtonAddTable = ({ actionFn }) => {
  return (
    <Button
      onClick={actionFn}
      variant='contained'
      sx={{
        borderRadius: 50,
        bgcolor: propStyles.greenColor,
        '&:hover': {
          bgcolor: propStyles.greenColor,
          opacity: 0.7,
        },
      }}
    >
      Добавить
    </Button>
  );
};

export default ButtonAddTable;
