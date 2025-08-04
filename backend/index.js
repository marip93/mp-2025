const express = require('express');

// crear servidor
const app = express();

// controlar ruta
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// levantar servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

