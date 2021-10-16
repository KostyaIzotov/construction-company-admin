import React from 'react';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const Buttondeletetable = ({ actionFn }) => {
  return (
    <Button
      onClick={actionFn}
      color='error'
      endIcon={<DeleteIcon color='error' />}
    >
      Удалить
    </Button>
  );
};

export default Buttondeletetable;
