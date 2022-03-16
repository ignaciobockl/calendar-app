import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store } >
        <LoginScreen />
    </Provider>
);



describe('Pruebas en <LoginScreen />', () => {

    test('debe de mostrarse correctamente', () => {

        expect ( wrapper ).toMatchSnapshot();

    });

});