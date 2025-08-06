const request = require('supertest');
const app = require('../index');

const usuarioAdmin = {
    usuario: "admin",
    clave: "123"
};

const usuarioMiembro = {
    usuario: "juan",
    clave: "123"
};

describe('POST /api/login admin', function () {
    it('Devolvería error de autenticación por clave erronea', async function () {
        const res = await request(app)
            .post('/api/login')
            //.set("Content-Type", "application/json")
            .send({ usuario: "admin", clave: 'erronea' });

        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual("Usuario o clave incorrecta");
    });

    it('Debería autenticar al usuario admin y devolver un token', async function () {
        const res = await request(app)
            .post('/api/login')
            //.set("Content-Type", "application/json")
            .send(usuarioAdmin);

        expect(res.statusCode).toEqual(200);
        expect(res.body.accessToken).toEqual(expect.any(String));
    });
});

describe('GET /api/jwt/peliculas', () => {
    it('devolveria error porque falta el token', async function () {
        const res = await request(app)
            .get('/api/jwt/peliculas');

        expect(res.statusCode).toEqual(401);
        expect(res.body.message).toEqual("No autorizado");
    });

    it('devolveria error porque el token es inválido', async function () {
        const res = await request(app)
            .get('/api/jwt/peliculas')
            .set("Authorization", "Bearer inválido");
        expect(res.statusCode).toEqual(403);
        expect(res.body.message).toEqual("Token inválido");
    });

    it('debería devolver la lista de películas para el usuario admin', async function () {
        const res1 = await request(app)
            .post('/api/login')
            .set("Content-Type", "application/json")
            .send(usuarioAdmin);
        expect(res1.statusCode).toEqual(200);
        let token = res1.body.accessToken;

        const res = await request(app)
            .get('/api/jwt/peliculas')
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual(
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
                }),
            ])
        );
    });

    it('Devolvería error de autorización porque solo los admins tienen permisos', async function () {
        const res1 = await request(app)
            .post("/api/login")
            .set("Content-type", "application/json")
            .send(usuarioMiembro);
            expect(res1.statusCode).toEqual(200);
            let token = res1.body.accessToken;

            const res = await request(app)
                .get("/api/jwt/peliculas")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toEqual(403);
            expect(res.body.message).toEqual('No tienes permiso para acceder a esta ruta');
    });
});