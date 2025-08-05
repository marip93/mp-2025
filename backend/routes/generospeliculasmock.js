const express = require('express');
const router = express.Router();

let arr_GenerosPeliculasMock = [
  { "IdGenero": 1, "Genero": 'Acción' },
  { "IdGenero": 2, "Genero": 'Aventura' },
  { "IdGenero": 3, "Genero": 'Comedia' },
  { "IdGenero": 4, "Genero": 'Drama' },
  { "IdGenero": 5, "Genero": 'Ciencia Ficción' },
  { "IdGenero": 6, "Genero": 'Fantasía' },
  { "IdGenero": 7, "Genero": 'Terror' },
  { "IdGenero": 8, "Genero": 'Suspenso' },
  { "IdGenero": 9, "Genero": 'Romance' },
  { "IdGenero": 10, "Genero": 'Musical' }
];

// Obtener el array de generos de películas
router.get('/api/generospeliculasmock', async function (req, res) {
    res.json(arr_GenerosPeliculasMock);
});

// Buscar un género de película por su IdGenero
router.get('/api/generospeliculasmock/:id', async function (req, res) {
    let generoPelicula = arr_GenerosPeliculasMock.find(
      (x) => x.IdGenero == req.params.id
    );
    if (generoPelicula) res.json(generoPelicula);
    else res.status(404).json({ message: 'Género de película no encontrado' });
});

// Obtener un género de película por su Género
router.get('/api/generospeliculasmock/Genero/:genero', async function (req, res) {
    let generoPelicula = arr_GenerosPeliculasMock.find(
      (x) => x.Genero.toUpperCase() === req.params.genero.toLowerCase()
    );
    if (generoPelicula) res.json(generoPelicula);
    else res.status(404).json({ message: 'Género de película no encontrado' });
});

// Agregar un nuevo género de película
router.post('/api/generospeliculasmock/', (req, res) => {
  const { Genero } = req.body;
let generoPelicula = {
    Genero,
    IdGenero: Math.floor(Math.random() * 10000) // Generar un IdGenero aleatorio
  };

  // Agregar a la coleccion
  arr_GenerosPeliculasMock.push(generoPelicula);

  res.status(201).json(generoPelicula);
});

// Actualizar un género de película por su IdGenero
router.put('/api/generospeliculasmock/:id', (req, res) => {
  let generoPelicula = arr_GenerosPeliculasMock.find(
    (x) => x.IdGenero == req.params.id
  );

  if (generoPelicula) {
    const { Genero } = req.body;
    generoPelicula.Genero = Genero;

    res.json({ message: 'Género de película actualizado'});
  } else {
    res.status(404).json({ message: 'Género de película no encontrado' });
  }
});

// Eliminar un género de película por su IdGenero
router.delete('/api/generospeliculasmock/:id', (req, res) => {
  let generoPelicula = arr_GenerosPeliculasMock.find(
    (x) => x.IdGenero == req.params.id
  );

  if (generoPelicula) {
    arr_GenerosPeliculasMock = arr_GenerosPeliculasMock.filter(
      (x) => x.IdGenero != req.params.id
    );
    res.json({ message: 'Género de película eliminado' });
  } else {
    res.status(404).json({ message: 'Género de película no encontrado' });
  }
});

module.exports = router;