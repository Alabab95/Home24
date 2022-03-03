import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'antd/dist/antd.css';

import {App} from './components/App';
import { DataContextProvider } from './context/data';

ReactDOM.render(
  <React.StrictMode>
    <DataContextProvider>
      <App/>
    </DataContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
