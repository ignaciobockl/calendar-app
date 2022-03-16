import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom';

import { LoginScreen } from '../../../components/auth/LoginScreen';

import { startLogin, startRegister } from '../../../actions/auth';


jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));


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

    test('debe de llamar el dispatch del Login', () => {

        wrapper.find('input[name="lEmail"]').simulate('change', {
            target: {
                name: 'lEmail',
                value: 'cami@gmail.com'
            }
        });

        wrapper.find('input[name="lPassword"]').simulate('change', {
            target: {
                name: 'lPassword',
                value: '123456'
            }
        });

        wrapper.find('form').at(0).prop('onSubmit')({
            preventDefault(){}
        });

        expect( startLogin ).toHaveBeenCalledWith('cami@gmail.com', '123456');

    });

    test('No hay registro si las contraseñas son diferentes', () => {

        wrapper.find('input[name="rName"]').simulate('change', {
            target: {
                name: 'rName',
                value: 'Camii'
            }
        });

        wrapper.find('input[name="rEmail"]').simulate('change', {
            target: {
                name: 'rEmail',
                value: 'cami@gmail.com'
            }
        });

        wrapper.find('input[name="rPassword1"]').simulate('change', {
            target: {
                name: 'rPassword1',
                value: '123456'
            }
        });

        wrapper.find('input[name="rPassword2"]').simulate('change', {
            target: {
                name: 'rPassword2',
                value: '132456'
            }
        });

        wrapper.find('form').at(1).prop('onSubmit')({
            preventDefault(){}
        });

        // startRegister should not be called if the passwords are not the same
        expect( startRegister ).not.toHaveBeenCalled();

        // sweetalert2 must be called in case the passwords are different
        expect( Swal.fire ).toHaveBeenCalledWith('Error', 'Passwords do not match.', 'error');

    });

});