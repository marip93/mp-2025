const express = require('express');

const generospeliculasmockRouter = require('./routes/generospeliculasmock');


// crear servidor
const app = express();

require('./base-orm/sqlite-init'); //crear la base de datos y las tablas si no existen

app.use(express.json());
app.use(generospeliculasmockRouter);

// controlar ruta
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

const generospeliculasRouter = require('./routes/generospeliculas');
app.use(generospeliculasRouter);

const peliculasRouter = require('./routes/peliculas');
app.use(peliculasRouter);

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

