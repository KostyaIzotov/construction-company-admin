import React, { useState } from 'react';

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
import { workers } from '../../../resources/mockedData';
import ButtonAddTable from '../../Elements/Buttons/ButtonAddTable';

const WorkersTable = ({ setShowModal }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 160px)' }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Фамилия</TableCell>
              <TableCell align='center'>Имя</TableCell>
              <TableCell align='center'>Номер телефона</TableCell>
              <TableCell align='center'>Кол-во инструментов</TableCell>
              <TableCell sx={{ width: 100, padding: '0 16px' }} align='center'>
                <ButtonAddTable actionFn={() => setShowModal(true)} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((worker, i) => {
                return (
                  <TableRow
                    key={worker.id}
                    onClick={() => setShowModal(true)}
                    sx={{
                      bgcolor: i % 2 === 0 ? '#F0F8FF' : '#F5FFFA',
                      cursor: 'pointer',
                    }}
                    hover
                    role='checkbox'
                    tabIndex={-1}
                  >
                    <TableCell align='center'>{worker.firstName}</TableCell>
                    <TableCell align='center'>{worker.secondName}</TableCell>
                    <TableCell align='center'>{worker.phone}</TableCell>
                    <TableCell align='center'>
                      {worker.partsCount} шт.
                    </TableCell>
                    <TableCell align='center'></TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={workers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default WorkersTable;
