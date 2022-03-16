import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2'

import '@testing-library/jest-dom';

import { startChecking, startLogin, startRegister } from '../../actions/auth';

import { types } from '../../types/types';

import * as fetchModule from '../../helpers/fetch';


jest.mock( 'sweetalert2', () => ({
    fire: jest.fn()
}));


const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
let store = mockStore( initState );

// simulacion localStorage
Storage.prototype.setItem = jest.fn();


describe('Pruebas en las acciones de auth', () => {

    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto', async() => {

        await store.dispatch( startLogin('test@gmail.com', '132456') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1]
        // console.log(localStorage.setItem.mock.calls[0][1])

    });

    test('startLogin password incorrecto', async() => {

        await store.dispatch( startLogin('test@gmail.com', '1123456') );

        const actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "The username and/or password are incorrect.", "error");

    });

    test('startLogin email incorrecto', async() => {

        await store.dispatch( startLogin('test1@gmail.com', '132456') );

        const actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith("Error", "The username and/or password are incorrect.", "error");

    });

    test('startRegister correcto', async() => {

        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    user: {
                        _id: '9428',
                        name: 'Abru',
                    },
                    token: 'AR4533664Q'
                }
            }
        }));

        await store.dispatch( startRegister( 'test2@gmail.com', '132456', 'Test2' ));

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '9428',
                name: 'Abru'
            }
        });

        // expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'AR4533664Q'); // the same as above but sending the simulated token

        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

    test('startChecking correcto', async() => {

        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    user: {
                        uid: '9428',
                        name: 'Abru',
                    },
                    token: 'AR4533664Q'
                }
            }
        }));

        await store.dispatch( startChecking() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '9428',
                name: 'Abru'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'AR4533664Q');

        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

    });

});
