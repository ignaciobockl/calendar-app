import Swal from "sweetalert2";

import { fetchWithToken } from "../helpers/fetch";

import { prepareEvents } from "../helpers/preprareEvents";

import { types } from "../types/types"



const eventAddNew = ( event ) => ({
    type: types.eventAddNew,
    payload: event
});

export const eventClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const eventDeleted = () => ({
    type: types.eventDeleted
});

const eventLoaded = ( events ) => ({
    type: types.eventLoaded,
    payload: events
});

export const eventSetActive = ( event ) => ({
    type: types.eventSetActive,
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

export const eventStartLoading = () => {
    return async( dispatch ) => {

        try {
            
            const resp = await fetchWithToken( 'event' );
            const body = await resp.json();

            const events = prepareEvents( body.events );
            dispatch( eventLoaded( events ) );

        } catch (error) {
            Swal.fire('Error', error, 'error' );
        }

    }
}

export const eventUpdated = ( event ) => ({
    type: types.eventUpdate,
    payload: event
});
