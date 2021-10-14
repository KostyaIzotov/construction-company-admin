import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/App/App';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../src/store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
