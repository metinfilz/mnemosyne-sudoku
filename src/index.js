import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from "react-redux";
import PageRouter from "./pages";
import {store} from "./store/store";

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <PageRouter />
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);