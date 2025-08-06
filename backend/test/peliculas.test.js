const request = require('supertest');
const app = require('../index');

const peliculaAlta = {
    Titulo: "Pelicula de prueba",
    Anio_lanzamiento: 2023,
    Visto: false,
    Fecha_visualizacion: null,
    Rating: 5,
    Sinopsis: "Sinopsis de prueba",
    Review: "Review de prueba"
};

const peliculaModificacion = {
    IdPelicula: 1,
    Titulo: "Pelicula modificada",
    Anio_lanzamiento: 2024,
    Visto: true,
    Fecha_visualizacion: "2024-01-01",
    Rating: 8,
    Sinopsis: "Sinopsis modificada",
    Review: "Review modificada"
};

describe('GET /api/peliculas', () => {
    it('Debería devolver todas las películas', async () => {
        const res = await request(app).get('/api/peliculas');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                Peliculas:
                expect.arrayContaining([
                    expect.objectContaining({
                        IdPelicula: expect.any(Number),
                        Titulo: expect.any(String),
                        Anio_lanzamiento: expect.any(Number),
                        Visto: expect.any(Boolean),
                        Fecha_visualizacion: expect.any(String),
                        Rating: expect.any(String),
                        Sinopsis: expect.any(String),
                        Review: expect.any(String)
                    })
                ]),
                RegistrosTotal: expect.any(Number)
            })
        );
    });
});

describe('GET /api/peliculas/:id', () => {
    it('Debería devolver una película por ID', async () => {
        const res = await request(app).get('/api/peliculas/1');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPelicula: 1,
                Titulo: expect.any(String),
                Anio_lanzamiento: expect.any(Number),
                Visto: expect.any(Boolean),
                Fecha_visualizacion: expect.any(String),
                Rating: expect.any(String),
                Sinopsis: expect.any(String),
                Review: expect.any(String)
            })
        );
    });
});

describe('POST /api/peliculas', () => {
    it('Debería agregar una nueva película', async () => {
        const res = await request(app)
            .post('/api/peliculas')
            .send(peliculaAlta);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
            expect.objectContaining({
                IdPelicula: expect.any(Number),
                Titulo: peliculaAlta.Titulo.toUpperCase(),
                Anio_lanzamiento: peliculaAlta.Anio_lanzamiento,
                Visto: peliculaAlta.Visto,
                Fecha_visualizacion: peliculaAlta.Fecha_visualizacion,
                Rating: peliculaAlta.Rating,
                Sinopsis: peliculaAlta.Sinopsis,
                Review: peliculaAlta.Review
            })
        );
    });
})

describe('PUT /api/peliculas/:id', () => {
    it('Debería modificar una película existente', async () => {
        const res = await request(app)
            .put('/api/peliculas/1')
            .send(peliculaModificacion);
        expect(res.statusCode).toEqual(200);
    });
})

describe('DELETE /api/peliculas/:id', () => {
    it('Debería eliminar una película existente', async () => {
        const res = await request(app)
            .delete('/api/peliculas/1');
        expect(res.statusCode).toEqual(200);
    });
})