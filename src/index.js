import React from 'react';
import ReactDOM from 'react-dom';

import { CalendarApp } from './CalendarApp';
import { AppRouter } from './routers/AppRouter';


ReactDOM.render(
  <AppRouter>
    <CalendarApp />
  </AppRouter>,
  document.getElementById('root')
);

