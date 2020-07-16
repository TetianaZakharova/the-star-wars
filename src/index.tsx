import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import './index.css';
import { App } from './App';

const Root = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

