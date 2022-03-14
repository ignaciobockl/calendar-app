import Swal from "sweetalert2";

import { fetchWithoutToken } from "../helpers/fetch"

import { types } from "../types/types";



export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {

        const resp = await fetchWithoutToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            body.msg = 'The username and/or password are incorrect.'
            Swal.fire('Error', body.msg, 'error');
        }

    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});