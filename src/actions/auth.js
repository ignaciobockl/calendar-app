import Swal from "sweetalert2";

import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch"

import { types } from "../types/types";



const checkingFinish = () => ({
    type: types.authCheckingFinish
});

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const startChecking = () => {
    return async( dispatch ) => {

        const resp = await fetchWithToken( 'auth/renew'/*, { }, 'POST'*/ );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.user.uid,
                name: body.user.name
            }));

        } else {
            dispatch( checkingFinish() );
        }

    }
}

export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.user.uid,
                name: body.user.name
            }));

        } else {
            body.msg = 'The username and/or password are incorrect.'
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {

            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.user._id,
                name: body.user.name
            }));

            Swal.fire( 'Register', 'Successfully registered user.', 'success' );

        } else {
            Swal.fire( 'Error Register', 'User registration error.', 'error' );
        }

    }
}