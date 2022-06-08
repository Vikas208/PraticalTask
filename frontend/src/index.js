import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataLayer } from './DataLayer';
import { initialState } from "./Reducer/initialState";
import reducer from './Reducer/reducer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer} >
      <Router>
        <App />
      </Router>
    </DataLayer>
  </React.StrictMode>
);

