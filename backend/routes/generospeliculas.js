const express = require('express');
const router = express.Router();
const { ValidationError } = require('sequelize');

const db = require("../base-orm/sequelize-init");
const { where } = require('sequelize');

router.get("/api/generospeliculas", async function (req, res, next) {
    let data = await db.generospeliculas.findAll({
        attributes: ["IdGenero", "Genero"],
    });
    res.json(data);
});

router.get("/api/generospeliculas/:id", async function (req, res, next) {
    // #swagger.tags = ['GenerosPeliculas'];
    // #swagger.summary = 'Obtener genero de pelicula por id';
    // #swagger.parameters['id'] = { description: 'ID del genero de pelicula' };

    let data = await db.generospeliculas.findAll({
        attributes: ["IdGenero", "Genero"],
        where: {
            IdGenero: req.params.id
        },
    });
    if (data.length > 0) res.json(data[0]);
    else res.status(404).send("No se encontró el genero de pelicula");
});

router.post("/api/generospeliculas", async (req, res) => {
    // #swagger.tags = ['Géneros Películas']
    // #swagger.summary = 'Agrega un género de película'
    /* #swagger.parameters['genero'] = {
           in: 'body',
           description: 'Nuevo género.',
           schema: { $ref: "#/definitions/GenerosPeliculas" }
    } */
    try {
    let gen = await db.generospeliculas.create({
        Genero: req.body.Genero
    });
    res.status(200).json(gen.dataValues); //devuelve el registro insertado
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
    

router.put("/api/generospeliculas/:id", async (req, res) => {
    // #swagger.tags = ['Géneros Películas']
    // #swagger.summary = 'Actualiza el género de una película'
    // #swagger.parameters['id'] = { description: 'ID del género de película' }
    /* #swagger.parameters['gen'] = {
           in: 'body',
           description: 'Datos del género a actualizar.',
           schema: { $ref: "#/definitions/GenerosPeliculas" }
    } */

    try {
        let gen = await db.generospeliculas.findOne({
            attributes: [
                'IdGenero', 
                'Genero'
            ],
            where: { IdGenero: req.params.id },
        });
        if (!gen) {
            res.status(404).json({ message: "Género no encontrado" });
            return;
        }
        gen.Genero = req.body.Genero;
        await gen.save();

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

router.delete("/api/generospeliculas/:id", async (req, res) => {
    // #swagger.tags = ['Géneros Películas']
    // #swagger.summary = 'Elimina un género de película'
    // #swagger.parameters['id'] = { description: 'ID del género de pelicula' }
    try {
        let gen = await db.generospeliculas.findOne({
            where: { IdGenero: req.params.id },
        });
        if (!gen) {
            res.status(404).json({ message: "Género no encontrado" });
            return;
        }
        await db.peliculas_generos.destroy({
            where: { IdGenero: req.params.id }
        });
        await gen.destroy();
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