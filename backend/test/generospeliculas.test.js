const request = require('supertest');
const app = require('../index');

const generoAlta = {
    Genero: "Nuevo Género"
};

const generoModificacion = {
    IdGenero: 1,
    Genero: "Género modificado"
};

describe('GET /api/generospeliculas', function () {
    it('Debería devolver todos los géneros de películas', async function () {
        const res = await request(app)
            .get('/api/generospeliculas')
            .set('content-type', 'application/json');
        expect(res.headers['content-type']).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    IdGenero: expect.any(Number),
                    Genero: expect.any(String),
                }),
            ])
        );
    });
});

describe('GET /api/generospeliculas/:id', function () {
    it('Debería devolver un género de película por ID', async function () {
        const res = await request(app)
        .get("/api/generospeliculas/1");
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdGenero: 1,
                Genero: expect.any(String),
            })
        );
    })
});

describe('POST /api/generospeliculas', () => {
    it('Debería agregar un nuevo género', async () => {
        const res = await request(app)
            .post('/api/generospeliculas')
            .send(generoAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdGenero: expect.any(Number),
                Genero: generoAlta.Genero
            })
        );
    });
})

describe('PUT /api/generospeliculas/:id', () => {
    it('Debería modificar un género existente', async () => {
        const res = await request(app)
            .put('/api/generospeliculas/1')
            .send(generoModificacion);
        expect(res.statusCode).toEqual(200);
    });
})

describe('DELETE /api/generospeliculas/:id', () => {
    it('Debería eliminar un género existente', async () => {
        const res = await request(app)
            .delete('/api/generospeliculas/1');
        expect(res.statusCode).toEqual(200);
    });
})