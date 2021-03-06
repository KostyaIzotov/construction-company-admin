import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import {
  TableRow,
  TableHead,
  Paper,
  TablePagination,
  TableBody,
  Table,
  TableCell,
  TableContainer,
} from '@mui/material';
import ButtonAddTable from '../../Elements/Buttons/ButtonAddTable';
import Spinner from '../../Spinner/Spinner';
import ActionWorkersModal from '../../Modals/ActionWorkersModal';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal/ConfirmDeleteModal';
import Buttondeletetable from '../../Elements/Buttons/ButtonDeleteTable/ButtonDeleteTable';

const WorkersTable = ({
  getWorkersList,
  workersList,
  loadingWorkersList,
  deleteWorker,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [worker, setWorker] = useState(null);
  const [workerId, setWorkerId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    getWorkersList();
  }, [getWorkersList]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (item) => {
    setWorker(item);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setWorkerId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 160px)' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Фамилия</TableCell>
                <TableCell align='center'>Имя</TableCell>
                <TableCell align='center'>Номер телефона</TableCell>
                <TableCell align='center'>Кол-во инструментов</TableCell>
                <TableCell
                  sx={{ width: 100, padding: '0 16px' }}
                  align='center'
                >
                  <ButtonAddTable actionFn={() => openModal(null)} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingWorkersList &&
                workersList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((worker, i) => {
                    return (
                      <TableRow
                        key={i}
                        // key={worker.id}
                        onClick={() => openModal(worker)}
                        sx={{
                          bgcolor: i % 2 === 0 ? '#F0F8FF' : '#F5FFFA',
                          cursor: 'pointer',
                        }}
                        hover
                        role='checkbox'
                        tabIndex={-1}
                      >
                        <TableCell align='center'>{worker.firstName}</TableCell>
                        <TableCell align='center'>
                          {worker.secondName}
                        </TableCell>
                        <TableCell align='center'>{worker.phone}</TableCell>
                        <TableCell align='center'>
                          {worker.partsCount} шт.
                        </TableCell>
                        <TableCell align='center'>
                          <Buttondeletetable
                            actionFn={(e) => {
                              e.stopPropagation();
                              openDeleteModal(worker.id);
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage='Кол-во записей на странице:'
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={workersList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Spinner loading={loadingWorkersList} />
      <ActionWorkersModal
        data={worker}
        open={showModal}
        setOpen={setShowModal}
      />
      <ConfirmDeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={workerId}
        deleteItem={deleteWorker}
      />
    </>
  );
};

const mapState = ({ workers: { workersList, loadingWorkersList } }) => ({
  workersList,
  loadingWorkersList,
});

const mapDispatch = (dispatch) => ({
  getWorkersList: () => dispatch.workers.getWorkersList(),
  deleteWorker: (id) => dispatch.workers.deleteWorker(id),
});

export default connect(mapState, mapDispatch)(WorkersTable);
