import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';

import '@testing-library/jest-dom';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';

import { messages } from '../../../helpers/calendar-messages-es';

import { types } from '../../../types/types';

import { eventSetActive } from '../../../actions/events';

// mock a la accion eventSetActive
jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));

// localStorage
Storage.prototype.setItem = jest.fn();


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: [{}]
    },
    auth: {
        checking: false,
        uid: '2719',
        name: 'Brisa'
    },
    ui: {
        modalOpen: false
    }
};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <CalendarScreen />
    </Provider>
);




describe('Pruebas en <CalendarScreen />', () => {

    test('debe de mostrarse correctamente', () => {

        expect( wrapper ).toMatchSnapshot();

    });

    test('pruebas con las interacciones del calendario', () => {

        const calendar = wrapper.find('Calendar');

        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 690154272 })
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 690154272 });

        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');
        });

    });

});