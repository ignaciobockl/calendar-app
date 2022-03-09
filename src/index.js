import React from 'react';
import ReactDOM from 'react-dom';

import { CalendarApp } from './CalendarApp';
import { AppRouter } from './routers/AppRouter';

import './styles.css';


ReactDOM.render(
  <AppRouter>
    <CalendarApp />
  </AppRouter>,
  document.getElementById('root')
);

