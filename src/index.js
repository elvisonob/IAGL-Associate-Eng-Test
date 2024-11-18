import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './TodoApp.js';
import { Provider } from 'react-redux';
import store from './store/index';

const el = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  el
);
