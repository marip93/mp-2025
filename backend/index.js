const express = require('express');

const generospeliculasmockRouter = require('./routes/generospeliculasmock');


// crear servidor
const app = express();

require('./base-orm/sqlite-init'); //crear la base de datos y las tablas si no existen

app.use(express.json());
app.use(generospeliculasmockRouter);

// RUTAS
const generospeliculasRouter = require('./routes/generospeliculas');
app.use(generospeliculasRouter);

const peliculasRouter = require('./routes/peliculas');
app.use(peliculasRouter);


app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

app.get('/_isalive', (req, res) => {
  res.status(200).send('Ejecutándose desde ' + __dirname);
});

app.use((req, res) => {
  res.status(404).send('404 No encontrado');
});

// levantar servidor
if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  });
}

module.exports = app;

