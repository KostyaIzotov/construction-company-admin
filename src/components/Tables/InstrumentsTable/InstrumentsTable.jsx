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
import ActionInstrumentsModal from '../../Modals/ActionInstrumentsModal';
import Buttondeletetable from '../../Elements/Buttons/ButtonDeleteTable/ButtonDeleteTable';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal/ConfirmDeleteModal';

const InstrumentsTable = ({
  instrumentsList,
  loadingInstrumentsList,
  getInstrumentsList,
  deleteInstruments,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [instrument, setInstrument] = useState(null);
  const [instrumentId, setInstrumentId] = useState(null);

  useEffect(() => {
    getInstrumentsList();
  }, [getInstrumentsList]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (item) => {
    setInstrument(item);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setInstrumentId(id);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 'calc(100vh - 160px)' }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Название</TableCell>
                <TableCell align='center'>Работник</TableCell>
                <TableCell align='center'>Серийный номер</TableCell>
                <TableCell
                  sx={{ width: 100, padding: '0 16px' }}
                  align='center'
                >
                  <ButtonAddTable actionFn={() => openModal(null)} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingInstrumentsList &&
                instrumentsList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((instrument, i) => {
                    return (
                      <TableRow
                        key={i}
                        onClick={() => openModal(instrument)}
                        sx={{
                          bgcolor: i % 2 === 0 ? '#F0F8FF' : '#F5FFFA',
                          cursor: 'pointer',
                        }}
                        hover
                        role='checkbox'
                        tabIndex={-1}
                      >
                        <TableCell align='center'>{instrument.name}</TableCell>
                        <TableCell align='center'>
                          {instrument.worker}
                        </TableCell>
                        <TableCell align='center'>
                          {instrument.serial}
                        </TableCell>
                        <TableCell align='center'>
                          <Buttondeletetable
                            actionFn={(e) => {
                              e.stopPropagation();
                              openDeleteModal(instrument.id);
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
          count={instrumentsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Spinner loading={loadingInstrumentsList} />
      <ActionInstrumentsModal
        open={showModal}
        setOpen={setShowModal}
        data={instrument}
      />
      <ConfirmDeleteModal
        id={instrumentId}
        deleteItem={deleteInstruments}
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
      />
    </>
  );
};

const mapState = ({
  instruments: { instrumentsList, loadingInstrumentsList },
}) => ({
  instrumentsList,
  loadingInstrumentsList,
});

const mapDispatch = (dispatch) => ({
  getInstrumentsList: () => dispatch.instruments.getInstrumentsList(),
  deleteInstruments: (id) => dispatch.instruments.deleteInstruments(id),
});

export default connect(mapState, mapDispatch)(InstrumentsTable);
