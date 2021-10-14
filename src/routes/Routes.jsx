import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect } from 'react-router';

import RegistrationPage from '../pages/RegistationPage';
import AuthPage from '../pages/AuthPage';
import MainPage from '../pages/MainPage';

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

const routes = [
  {
    path: '/',
    component: MainPage,
    exact: true,
  },
];

const Routes = ({ isAuth }) => {
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
          {routes.map(({ path, component, exact }, i) => (
            <Route key={i} path={path} component={component} exact={exact} />
          ))}
        </>
      )}
    </Switch>
  );
};

const mapState = ({ auth: { isAuth } }) => ({
  isAuth,
});

export default connect(mapState)(Routes);
