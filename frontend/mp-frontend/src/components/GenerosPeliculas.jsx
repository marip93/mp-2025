import React, {useState, useEffect} from "react";
import { generosPeliculasMockService } from "../services/generospeliculas-mock-service";

function GenerosPeliculas() {
    const tituloPagina ='Generos Peliculas';
    const [generosPeliculas, setGenerosPeliculas] = useState(null);

    //cargar al montar el componente
    useEffect(() => {
        BuscarGenerosPeliculas();
    }, []);

    async function BuscarGenerosPeliculas() {
        let data = await generosPeliculasMockService.Buscar();
        setGenerosPeliculas(data);
    };

    return (
        <div>
            <div className="tituloPagina">{tituloPagina}</div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th style={{ width: "40%" }}>Id Genero</th>
                        <th style={{ width: "60%" }}>Generos</th>
                    </tr>
                </thead>

                <tbody>
                    {generosPeliculas && generosPeliculas.map((generoPelicula) => (
                        <tr key={generoPelicula.IdGenero}>
                            <td>{generoPelicula.IdGenero}</td>
                            <td>{generoPelicula.Genero}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export { GenerosPeliculas };