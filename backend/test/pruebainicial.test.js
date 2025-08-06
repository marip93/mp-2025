const request = require('supertest');
const app = require('../index');

describe('Ejemplo', () => {
    it("true === true?", () => {
        expect(true).toBe(true);
    });
});

describe('GET hola mundo', () => {
    it('responde con hola mundo', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('Hola Mundo');
    });
});

describe('GET _isalive', () => {
    it("Deberia devolver ejecutandose desde...", async () => {
        const res = await request(app).get('/_isalive');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toContain('Ejecutándose desde');
    });
});

describe('GET 404', () => {
    it('Debería devolver error 404 y su texto asociado', async () => {
        const res = await request(app).get('/urlinexistente');
        expect(res.statusCode).toEqual(404);
        expect(res.text).toEqual('404 No encontrado');
    });
});