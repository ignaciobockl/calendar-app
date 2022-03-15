import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';



describe('Pruebas en el helper Fetch', () => {

    let token = '';

    test('fetchWithoutToken debe de funcionar correctamente', async() => {

        const resp = await fetchWithoutToken( 
            'auth', 
            { email: 'test@gmail.com', password: '132456'}, 
            'POST' 
        );
        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        token = body.token; // Provisional

    });

    test('fetchWithToken debe de funcionar correctamente', async() => { 
        
        localStorage.setItem('token', token);

        const resp = await fetchWithToken( 
            'event/6230da404ef1b5a9e96df37d',
            {},
            'DELETE'
        );
        const body = await resp.json();

        expect( body.msg ).toBe('There is no event with the entered id.');

    });

});