import React from 'react';

import { Typography } from '@mui/material';
import propStyles from '../../../resources/propStyles';

const ActionGrayLabel = ({ label }) => {
  return (
    <Typography
      sx={{
        cursor: 'pointer',
        '&:hover': {
          color: propStyles.greenColor,
        },
      }}
      component='span'
      color={propStyles.inputLabelColor}
    >
      {label}
    </Typography>
  );
};

export default ActionGrayLabel;
