import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TablePagination,
  TableBody,
} from '@mui/material';

import Spinner from '../../Spinner/Spinner';
import Buttondeletetable from '../../Elements/Buttons/ButtonDeleteTable/ButtonDeleteTable';
import ButtonAddTable from '../../Elements/Buttons/ButtonAddTable';
import ActionCompaniesModal from '../../Modals/ActionCompaniesModal/ActionCompaniesModal';
import ConfirmDeleteModal from '../../Modals/ConfirmDeleteModal/ConfirmDeleteModal';

const CompaniesTable = ({
  companiesList,
  loadingCompaniesList,
  getCompaniesList,
  deleteCompany,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [company, setCompany] = useState(null);
  const [companyId, setCompanyId] = useState(null);

  useEffect(() => {
    getCompaniesList();
  }, [getCompaniesList]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openModal = (item) => {
    setCompany(item);
    setShowModal(true);
  };

  const openDeleteModal = (id) => {
    setCompanyId(id);
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
                <TableCell align='center'>Пароль</TableCell>
                <TableCell
                  sx={{ width: 100, padding: '0 16px' }}
                  align='center'
                >
                  <ButtonAddTable actionFn={() => openModal(null)} />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!loadingCompaniesList &&
                companiesList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((company, i) => {
                    return (
                      <TableRow
                        key={i}
                        onClick={() => openModal(company)}
                        sx={{
                          bgcolor: i % 2 === 0 ? '#F0F8FF' : '#F5FFFA',
                          cursor: 'pointer',
                        }}
                        hover
                      >
                        <TableCell align='center'>{company.name}</TableCell>
                        <TableCell align='center'>{company.password}</TableCell>
                        <TableCell align='center'>
                          <Buttondeletetable
                            actionFn={(e) => {
                              e.stopPropagation();
                              openDeleteModal(company.id);
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
          count={companiesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {loadingCompaniesList && <Spinner loading={loadingCompaniesList} />}
      <ActionCompaniesModal
        open={showModal}
        setOpen={setShowModal}
        data={company}
      />
      <ConfirmDeleteModal
        open={showDeleteModal}
        setOpen={setShowDeleteModal}
        id={companyId}
        deleteItem={deleteCompany}
      />
    </>
  );
};

const mapState = ({ companies: { companiesList, loadingCompaniesList } }) => ({
  companiesList,
  loadingCompaniesList,
});

const mapDispatch = ({ companies }) => ({
  getCompaniesList: () => companies.getCompaniesList(),
  deleteCompany: (id) => companies.deleteCompany(id),
});

export default connect(mapState, mapDispatch)(CompaniesTable);
