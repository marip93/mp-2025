const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../seguridad/auth');

const users = [
    {
        usuario: "admin",
        clave: "123",
        rol: "admin",
    },
    {
        usuario: "juan",
        clave: "123",
        rol: "member",
    },
];

let refreshTokens = [];

router.post('/api/login', (req, res) => {
    // #swagger.tags = ['Seguridad']
    // #swagger.description = 'login de usuarios: admin/123(administrador) o juan/123(miembro)'
    const { usuario, clave } = req.body;

    // Filtra el usuario
    const user = users.find((u) => {
        return u.usuario === usuario && u.clave === clave;
    });

    if (user) {
        // Generar un token
        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: '30m' }
        );

        const refreshToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.refreshTokenSecret
        );

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken,
            message: "Bienvenido " + user.usuario + "!",
        });
    } else {
        res.json({ message: "Usuario o clave incorrecta" });
    }
});

router.post("/api/logout", (req, res) => {
    // #swagger.tags = ['Seguridad']
    // #swagger.summary = 'Logout: invalida el refresh token'

    let message = "Logout inválido!";
    const { token } = req.body;

    if (!refreshToken) {
        return res.sendStatus(401)
    }

    if (!refreshTokens.includes(refreshToken)) {
        return res.sendStatus(403);
    }

    jwt. verify(refreshToken, auth.refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign(
            { usuario: user.usuario, rol: user.rol },
            auth.accessTokenSecret,
            { expiresIn: '30m' }
        );

        res.json({
            accessToken
        });
    });
});

module.exports = router;