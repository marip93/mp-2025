const express = require('express');
const router = express.Router();

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

module.exports = router;