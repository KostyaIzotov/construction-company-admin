import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Transition from '../Transition';

const ConfirmDeleteModal = ({ open, setOpen, deleteItem, id }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    deleteItem(id);
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby='alert-dialog-slide-description'
    >
      <DialogTitle>Удаление записи</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-slide-description'>
          Вы действительно хотите удалить запись?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Отмена</Button>
        <Button onClick={handleDelete}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
