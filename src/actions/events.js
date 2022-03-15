import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";

import { types } from "../types/types"



const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventStartAddNew = ( event ) => {
    return async( dispatch, getState ) => {

        const { uid, name } = getState().auth;
        
        try {
            
            const resp = await fetchWithToken( 'event', event, 'POST' );
            const body = await resp.json();

            if ( body.ok ) {

                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                }

                dispatch( eventAddNew( event ) );

            }

        } catch (error) {
            Swal.fire('Error', error, 'error' );
        }

    }
}

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
    payload: event
});

export const eventUpdated = ( event ) => ({
    type: types.eventUpdate,
    payload: event
});
