import arrayGenerosPeliculas from "../datos-mock/generospeliculas-mock";

async function Buscar() {
    return arrayGenerosPeliculas;
}

async function BuscarPorId(IdGenero) {
    return arrayGenerosPeliculas.find((generopelicula) => generopelicula);
}

async function Agregar(generopelicula) {
    generopelicula.IdGenero = arrayGenerosPeliculas.length + 1;

    arrayGenerosPeliculas.push(generopelicula);
}

async function Modificar(generopelicula) {
    let generoPeliculaEncontrado =
    arrayGenerosPeliculas.find((generopeliculafind) =>
    generopeliculafind.IdGenero === generopelicula.IdGenero);

    if (generoPeliculaEncontrado) {
        generoPeliculaEncontrado.Genero = generopelicula.Genero;
    }
}

async function Eliminar(IdGenero) {
    let generoPeliculaEncontrado = 
    arrayGenerosPeliculas.find((generopeliculafind) => 
    generopeliculafind.IdGenero === IdGenero);

    if (generoPeliculaEncontrado) {
        arrayGenerosPeliculas.splice(arrayGenerosPeliculas.indexOf(generoPeliculaEncontrado), 1);
    }
}

export const generosPeliculasMockService = {
    Buscar, BuscarPorId, Agregar, Modificar, Eliminar
};