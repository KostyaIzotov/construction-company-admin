import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router';
import { Box } from '@mui/material';

import DrawerHeader from '../components/Drawer/DrawerHeader';
import DrawerLayout from '../components/Drawer/Drawer';
import Header from '../components/Header';

import RegistrationPage from '../pages/RegistationPage';
import AuthPage from '../pages/AuthPage';
import MainPage from '../pages/MainPage';
import InstrumentsPage from '../pages/InstrumentsPage';
import WorkersPage from '../pages/WorkersPage';

const routes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
  },
  {
    path: '/instruments',
    component: InstrumentsPage,
  },
  {
    path: '/workers',
    component: WorkersPage,
  },
];

const authRoutes = [
  {
    path: '/auth',
    component: AuthPage,
  },
  {
    path: '/registation',
    component: RegistrationPage,
  },
];

const Routes = ({ isAuth, isOpenDrawer }) => {
  return (
    <Switch>
      {!isAuth ? (
        <>
          <Redirect to='/auth' />
          {authRoutes.map(({ path, component }, i) => (
            <Route key={i} path={path} component={component} />
          ))}
        </>
      ) : (
        <>
          <Redirect to='/' exact />
          <Box sx={{ display: 'flex' }}>
            <Header isOpenDrawer={isOpenDrawer} />
            <DrawerLayout isOpenDrawer={isOpenDrawer} />
            <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
              <DrawerHeader />
              {routes.map(({ path, component, exact }, i) => (
                <Route
                  state={12312}
                  key={i}
                  path={path}
                  component={component}
                  exact={exact}
                />
              ))}
            </Box>
          </Box>
        </>
      )}
    </Switch>
  );
};

const mapState = ({ auth: { isAuth }, layout: { isOpenDrawer } }) => ({
  isAuth,
  isOpenDrawer,
});

export default connect(mapState)(Routes);
