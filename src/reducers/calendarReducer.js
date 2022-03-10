import moment from 'moment';
import { types } from '../types/types';


const initialState = {
    events: [{
        title: 'Cumpleaños de Mailen',
        start: moment().toDate(),
        end: moment().add( 5, 'hours' ).toDate(),
        bgcolor: '#fafafa',
        notes: 'Te deseamos un feliz cumpleaños',
        user: {
          _id: '1548',
          name: 'Nacho'
        }
      }

    ],
    activeEvent: null
};


export const calendarReducer = ( state = initialState, action ) => {

    switch ( action.type ) {
    
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        default:
            return state;
    }

}