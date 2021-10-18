import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { Box } from '@mui/material';
import './App.css';

import Routes from '../routes/Routes';
import Notify from '../components/Notify';
import Spinner from '../components/Spinner/Spinner';
import propStyles from '../resources/propStyles';

const App = ({ checkAuthUser, loadingAuth }) => {
  useEffect(() => {
    checkAuthUser();
  }, [checkAuthUser]);

  if (loadingAuth) {
    return (
      <Box sx={{ height: '94vh', ...propStyles.centerBlock }}>
        <Spinner loading={loadingAuth} />
      </Box>
    );
  }

  return (
    <Box width='100%' height='100%'>
      <Routes />
      <Notify />
    </Box>
  );
};

const mapState = ({ auth: { loadingAuth } }) => ({ loadingAuth });

const mapDispatch = (dispatch) => ({
  checkAuthUser: () => dispatch.auth.checkAuthUser(),
});

export default connect(mapState, mapDispatch)(App);
