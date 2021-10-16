import React from 'react';

import { makeStyles } from '@mui/styles';
import { Dialog, DialogContent, DialogActions, Grid, Box } from '@mui/material';

import LabelInput from '../../Elements/Inputs/LabelInput';
import ButtonConfirmModal from '../../Elements/Buttons/ButtonConfirmModal';
import ModalTitle from '../ModalTitle';

const ActionWorkersModal = ({ open, setOpen }) => {
  const classes = useStyles();

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth='sm'
        onClose={() => setOpen(false)}
        aria-labelledby='customized-dialog-title'
        open={open}
      >
        <ModalTitle onClose={() => setOpen(false)}>
          Добавление работника
        </ModalTitle>
        <DialogContent dividers>
          <Box mb={2}>
            <Grid container direction='row' alignItems='center'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput label='Имя' />
              </Grid>
              <Grid item xs={6}>
                <LabelInput label='Фамилия' />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 2 }} container direction='row' alignItems='center'>
              <Grid className={classes.pr20} item xs={6}>
                <LabelInput label='Телефон' />
              </Grid>
              <Grid item xs={6}>
                <LabelInput label='Кол-во деталей' />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <ButtonConfirmModal actionFn={() => setOpen(false)} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

const useStyles = makeStyles({
  pr20: {
    paddingRight: 24,
  },
});

export default ActionWorkersModal;
