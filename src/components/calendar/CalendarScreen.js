import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import 'moment/locale/es';
moment.locale('es');

const localizer = momentLocalizer(moment);
const myEventsList = [{
  title: 'Cumpleaños de Mengueche',
  start: moment().toDate(),
  end: moment().add( 2, 'hours' ).toDate(),
  bgcolor: '#fafafa',
  notes: 'El que te lleno...',
  user: {
    _id: '1548',
    name: 'Nachotta'
  }
}];

export const CalendarScreen = () => {

  const [ lastView, setLastView ] = useState( localStorage.getItem('lastView') || 'month' );

  const onDobleClick = (e) => {
    console.log(e)
  }

  const onSelectEvent = (e) => {
    console.log(e)
  }

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView', e);
  }

  const eventStyleGetter = ( event, start, end, isSelected ) => {

    const style = {
      backgroundColor: '#367CF7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }

  }

  return (
    <div className='calendar-screen'>

        <Navbar />

        <Calendar
          localizer={ localizer }
          events={ myEventsList }
          startAccessor="start"
          endAccessor="end"
          messages={ messages }
          eventPropGetter={ eventStyleGetter }
          components={{
            event: CalendarEvent
          }}
          onDoubleClickEvent={ onDobleClick }
          onSelectEvent={ onSelectEvent }
          onView={ onViewChange }
          view={ lastView }
        />

        <CalendarModal />

    </div>
  )
}
