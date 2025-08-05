// Configurar ORM con Sequelize
const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize("sqlite:" + process.env.base);
const sequelize = new Sequelize("sqlite:" + "./.data/peliculas.db");

// Definicion del modelo de datos
const generospeliculas = sequelize.define(
    'generospeliculas', 
    {
        IdGenero: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Genero: {
            type: DataTypes.STRING(30),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Género no puede estar vacío",
                },
                len: {
                    args: [5, 30],
                    msg: "Género debe tener entre 3 y 50 caracteres",
                },
            },
            unique: {
                args: true,
                msg: "Género ya existe",
            },
        },
    },
    {
        //pasar a mayúsculas
        hooks: {
            beforeValidate: function (generospeliculas, options) {
                if (typeof generospeliculas.Genero === "string") {
                    generospeliculas.Genero = generospeliculas.Genero.toUpperCase().trim()
                }
            },
        },
        timestaps: false
    }
);

const peliculas = sequelize.define(
    "peliculas",
    {
        IdPelicula: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Titulo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Título no puede estar vacío",
                },
                len: {
                    args: [3, 100],
                    msg: "Título debe tener entre 3 y 100 caracteres",
                },
            },
            unique: {
                args: true,
                msg: "Título ya existe",
            },
        },
        Anio_lanzamiento: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        Visto: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        Fecha_visualizacion: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        Rating: {
            type: DataTypes.STRING(5),
            allowNull: true,
        },
        Sinopsis: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        Review: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        // pasar a mayúsculas
        hooks: {
            beforeValidate: function (peliculas, options) {
                if (typeof peliculas.Titulo === "string") {
                    peliculas.Titulo = peliculas.Titulo.toUpperCase().trim()
                }
            },
        },
    },
    {
        timestamps: false
    }
);

module.exports = {
    sequelize,
    generospeliculas,
    peliculas,
};