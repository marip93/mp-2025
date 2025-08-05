const express = require('express');
const router = express.Router();
const db = require('../base-orm/sequelize-init');
const { Op, ValidationError } = require('sequelize');

router.get('/api/peliculas', async function (req, res, next) {
    // #swagger.tags = ['Películas']
    // #swagger.summary = 'Obtener todas las películas'
    // Consulta de peliculas con filtros y paginación

    let where = {};
    if (req.query.Titulo != undefined && req.query.Titulo !== "") {
        where.Titulo = {
            [Op.like]: "%" + req.query.Titulo + "%",
        };
    }
    if (req.query.Visto != undefined && req.query.Visto !== "") {
        where.Visto = req.query.Visto === "true";
    }

    const Pagina = req.query.Pagina ?? 1;
    const TamanioPagina = 10;
    const { count, rows } = await db.peliculas.findAndCountAll({
        attributes: [
            'IdPelicula', 
            'Titulo', 
            'Anio_lanzamiento', 
            'Visto', 
            'Fecha_visualizacion',
            'Rating',
            'Sinopsis', 
            'Review'
        ],
        order: [["Titulo", "ASC"]],
        where,
        offset: (Pagina -1) * TamanioPagina,
        limit: TamanioPagina
    });

    return res.json({ Items: rows, RegistrosTotal: count });
});

router.get('/api/peliculas/:id', async function (req, res, next) {
    // #swagger.tags = ['Películas]
    // #swagger.summary = 'Obtener una película'
    // #swagger.parameters['id'] = { description: 'ID de la película' }
    let pelis = await db.peliculas.findOne({
        attributes: [
            'IdPelicula', 
            'Titulo', 
            'Anio_lanzamiento', 
            'Visto', 
            'Fecha_visualizacion',
            'Rating',
            'Sinopsis', 
            'Review'
        ],
        where: { IdPelicula: req.params.id },
    });
    res.json(pelis);
});

router.post("/api/peliculas", async (req, res) => {
    // #swagger.tags = ['Películas']
    // #swagger.summary = 'Agrega una película'
    /* #swagger.parameters['peli'] = {
           in: 'body',
           description: 'Nueva película.',
           schema: { $ref: "#/definitions/Peliculas" }
    } */
    try {
        let peli = await db.peliculas.create({
            Titulo: req.body.Titulo,
            Anio_lanzamiento: req.body.Anio_lanzamiento,
            Visto: req.body.Visto,
            Fecha_visualizacion: req.body.Fecha_visualizacion,
            Rating: req.body.Rating,
            Sinopsis: req.body.Sinopsis,
            Review: req.body.Review
        });
        res.status(200).json(peli.dataValues); //devuelve el registro insertado
        } catch (err) {
            if (err instanceof ValidationError) {
                // si son errores de validación, los devuelvo al cliente
                let messages = '';
                err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " +x.message + '\n');
                res.status(400).json({ message: messages });
            } else {
                // si son errores desconocidos, los paso al manejador de errores
                throw err;
            }
        }
});

router.put("/api/peliculas/:id", async (req, res) => {
    // #swagger.tags = ['Películas']
    // #swagger.summary = 'Actualiza una película'
    // #swagger.parameters['id'] = { description: 'ID de la película' }
    /* #swagger.parameters['peli'] = {
           in: 'body',
           description: 'Datos de la película a actualizar.',
           schema: { $ref: "#/definitions/Peliculas" }
    } */

    try {
        let peli = await db.peliculas.findOne({
            attributes: [
                'IdPelicula', 
                'Titulo', 
                'Anio_lanzamiento', 
                'Visto', 
                'Fecha_visualizacion',
                'Rating',
                'Sinopsis', 
                'Review'
            ],
            where: { IdPelicula: req.params.id },
        });
        if (!peli) {
            res.status(404).json({ message: "Película no encontrada" });
            return;
        }
        peli.Titulo = req.body.Titulo;
        peli.Anio_lanzamiento = req.body.Anio_lanzamiento;
        peli.Visto = req.body.Visto;
        peli.Fecha_visualizacion = req.body.Fecha_visualizacion;
        peli.Rating = req.body.Rating;
        peli.Sinopsis = req.body.Sinopsis;
        peli.Review = req.body.Review;
        await peli.save();

        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            // si son errores de validación, los devuelvo al cliente
            let messages = '';
            err.errors.forEach((x) => messages += x.path + ": " +x.message + '\n');
            res.status(400).json({ message: messages });
        } else {
            // si son errores desconocidos, los paso al manejador de errores
            throw err;
        }
    }
});

router.delete("/api/peliculas/:id", async (req, res) => {
    // #swagger.tags = ['Películas']
    // #swagger.summary = 'Elimina una película'
    // #swagger.parameters['id'] = { description: 'ID de la película' }
    try {
        let peli = await db.peliculas.findOne({
            where: { IdPelicula: req.params.id },
        });
        if (!peli) {
            res.status(404).json({ message: "Película no encontrada" });
            return;
        }
        await peli.destroy();
        res.sendStatus(200);
    } catch (err) {
        if (err instanceof ValidationError) {
            const messages = err.errors.map((x) => x.message);
            res.status(400).json({ message: messages });
        } else {
            throw err;
        }
    }
});

module.exports = router;