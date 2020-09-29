import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './Reducers/reducer';
import AddNewPatient from './Pages/Addnewpatient/AddNewPatient';

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <AddNewPatient />
  </Provider>,
  document.getElementById('root')
);
