import React from 'react';

import { CircularProgress, Box } from '@mui/material';
import propStyles from '../../resources/propStyles';

const Spinner = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box mt={5} sx={{ ...propStyles.centerBlock }}>
      <CircularProgress sx={{ color: propStyles.greenColor }} />
    </Box>
  );
};

export default Spinner;
