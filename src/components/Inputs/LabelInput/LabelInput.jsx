import React from 'react';

import { TextField, Typography } from '@mui/material';
import propStyles from '../../../resources/propStyles';

const LabelInput = ({ value, setValue, label, type = 'text', error }) => {
  return (
    <>
      <Typography
        mb={0.5}
        fontWeight='bolder'
        color={propStyles.inputLabelColor}
      >
        {label}
      </Typography>
      <TextField
        color='success'
        sx={{
          // eslint-disable-next-line
          ['& fieldSet']: {
            borderRadius: '14px',
          },
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        fullWidth
        variant='outlined'
        hiddenLabel
        type={type}
        error={!!error}
        helperText={error}
      />
    </>
  );
};

export default LabelInput;
