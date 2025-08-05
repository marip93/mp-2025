const express = require('express');

const generospeliculasmockRouter = require('./routes/generospeliculasmock');


// crear servidor
const app = express();

app.use(express.json());
app.use(generospeliculasmockRouter);

// controlar ruta
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

