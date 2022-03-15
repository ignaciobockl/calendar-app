import { types } from "../../types/types";



describe('Pruebas en Types', () => {

    test('los types deben de ser iguales', () => {

        expect( types ).toEqual({

            authCheckingFinish: '[auth] Finish checking login state',
            authLogin: '[auth] Start login',
            authStartRegister: '[auth] Start register',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout',

            eventSetActive: '[event] Set Active',
            eventLogout: '[event] Logout event',
            eventStartNew: '[event] Start add new',
            eventAddNew: '[event] Add new',
            eventClearActiveEvent: '[event] Clear active event',
            eventUpdate: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events loaded',

            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',

        });

    });

});