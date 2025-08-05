// Acceso a la base usando aa-sqlite
const db = require('aa-sqlite');

async function CrearBaseSiNoExiste() {
    // Abrir base, sino existe el archivo, lo crea
    await db.open("./.data/peliculas.db");
    // await db.open(process.env.base);

    let existe = false;
    let res = null;

    // Si la tabla usuarios no existe, la crea
    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'usuarios'`,
        []
    );

    if (res.contar > 0) existe = true;

    if (!existe) {
        await db.run(
            `CREATE table usuarios( IdUsuario INTEGER PRIMARY KEY AUTOINCREMENT, Nombre text NOT NULL UNIQUE, Clave text NOT NULL, Rol text NOT NULL);`
        );
        console.log("Tabla usuarios creada!");
        await db.run(
            `INSERT INTO usuarios VALUES (1, 'admin', '123', 'admin'),(2,'juan','123','member');`
        );
    }

    // Si la tabla generospeliculas no existe, la crea
    existe = false;
    res = await db.get(
        `SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'generospeliculas'`,
        []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table generospeliculas( IdGenero INTEGER PRIMARY KEY AUTOINCREMENT, Genero text NOT NULL UNIQUE);`
        );
    console.log("Tabla generospeliculas creada!");
    await db.run(
        `INSERT INTO generospeliculas VALUES 
        (1, 'Acción'),
        (2,'Aventura'),
        (3,'Comedia'),
        (4,'Drama'),
        (5,'Ciencia Ficción'),
        (6,'Fantasía'),
        (7,'Terror'),
        (8,'Suspenso'),
        (9,'Romance'),
        (10,'Musical'),
        (11,'Biografía'),
        (12,'Documental');`
        );
    }

    // Si la tabla peliculas no existe, la crea
    existe = false;
    sql = "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'peliculas'";
    res = await db.get(sql, []);
    if (res.contar > 0) existe = true;
    if (!existe) {
        await db.run(
            `CREATE table peliculas( 
            IdPelicula INTEGER PRIMARY KEY AUTOINCREMENT, 
            Titulo text NOT NULL, 
            Anio_lanzamiento integer,
            Visto boolean, 
            Fecha_visualizacion text,
            Rating text,
            Sinopsis text,
            Review text
            );`
        );
        console.log("Tabla peliculas creada!");

        await db.run(
            `CREATE table peliculas_generos(
            IdPelicula integer NOT NULL,
            IdGenero integer NOT NULL,
            PRIMARY KEY (IdPelicula, IdGenero),
            FOREIGN KEY (IdPelicula) REFERENCES peliculas(IdPelicula),
            FOREIGN KEY (IdGenero) REFERENCES generospeliculas(IdGenero)
            );`
        );
        console.log("Tabla peliculas_generos creada!");

        await db.run(
            `INSERT INTO peliculas VALUES 
            (1, 'The Fantastic Four: First Steps', 2025, 1, 2025, '7/10', 'Una de las familias más icónicas de Marvel llega a la gran pantalla: los Cuatro Fantásticos.', 'N/A'),
            (2, 'A Complete Unknown', 2024, 0, 'N/A', 'N/A', 'En 1961, un desconocido de 19 años llamado Bob Dylan llegó a Nueva York sólo con su guitarra. Conoció a iconos de la música folk y pronto se hizo notar por su talento.', 'N/A'),
            (3, 'Wicked', 2024, 1, 2024, 8/10, 'La historia de cómo una joven de piel verde es incriminada por el Mago de Oz y se convierte en la Malvada Bruja del Oeste. La primera de una adaptación cinematográfica en dos partes del musical de Broadway.', 'N/A'),
            (4, 'Alien: Romulus', 2024, 1, 2024, '7/10', 'Los jóvenes de un mundo distante deben enfrentarse a la forma de vida más espeluznante del universo.', 'N/A'),
            (5, 'Heart Eyes', 2025, 1, 2025, '4/10', 'Dos compañeros de trabajo son confundidos con una pareja por un asesino en San Francisco el día de San Valentín. Obligados a eludir al asesino, navegan por el paisaje romántico de la ciudad mientras trabajan juntos para sobrevivir.', 'N/A'),
            (6, 'Babygirl', 2024, 1, 2024, '5/10', 'A pesar de los riesgos y los prejuicios, una directora ejecutiva muy exitosa comienza una aventura ilícita con su pasante mucho más joven.', 'N/A'),
            (7, 'Companion', 2025, 1, 2025, '7/10', 'Un grupo de amigos va a pasar el fin de semana a la finca de un excéntrico millonario, novio de una de ellos. Allí una de las chicas asesina al dueño de la mansión para evitar que la ataque, pero, entonces, descubre que nada es lo que parece.', 'N/A'),
            (8, 'Sinners', 2025, 1, 2025, '8/10', 'Tratando de descubrir sus problemáticas vidas detrás, los hermanos gemelos regresan a su ciudad natal para comenzar de nuevo, solo para descubrir que un mal aún mayor los espera para darles la bienvenida nuevamente.', 'N/A'),
            (9, 'The Substance', 2024, 1, '2024', '8/10', 'El terror corporal: La poderosa re-lectura feminista de Fargeat', 'N/A'),
            (10, 'Anora', 2024, 1, 2024, '8/10', 'Anora, una joven trabajadora sexual de Brooklyn, conoce a Ivan, el hijo de un oligarca. Se casan por capricho. Su cuento de hadas se ve amenazado cuando los padres de Iván se enteran de la noticia y deciden anular el matrimonio.', null),
            (11, 'Heretic', 2024, 1, 2025, '7/10', 'Sigue a dos jóvenes religiosas que se involucran en un juego del gato y el ratón en la casa de un extraño.', 'N/A'),
            (12, 'My Oxford Year', 2025, 1, 2025, '6/10', 'Anna, una ambiciosa estudiante estadounidense, viaja a Oxford para cumplir su sueño, pero se encuentra con un encantador lugareño que cambia la vida de ambos.', 'N/A'),
            (13, 'Nosferatu', 2024, 0, 'N/A', 'N/A', 'Una historia gótica de obsesiones entre una joven atormentada en la Alemania del siglo XIX y el antiguo vampiro de Transilvania que la acecha, trayendo consigo un inefable horror.', 'N/A'),
            (14, '28 Days Later', 2025, 0, 'N/A', 'N/A', 'Cuatro semanas después de que un misterioso e incurable virus se propague por todo el Reino Unido, un puñado de sobrevivientes intentan encontrar un santuario.', 'N/A'),
            (15, '28 Weeks Later', 2025, 0, 'N/A', 'N/A', 'Un virus infectó a la población del Reino Unido hace seis meses. El ejército de Estados Unidos ha acordonado una zona de Londres para que los supervivientes puedan empezar de nuevo, pero las cosas no salen como estaban planeadas.', 'N/A'),
            (16, '28 Years Later', 2025, 0, 'N/A', 'N/A', 'Sobrevivientes aislados descubren horrores en tierra firme: el virus de la rabia ha evolucionado, mutando tanto a infectados como a supervivientes. Una misión rutinaria revela secretos devastadores.', 'N/A'),
            (17, 'Thunderbolts*', 2025, 0, 'N/A', 'N/A', 'Un grupo de supervillanos son reclutados para realizar misiones para el gobierno.', 'N/A'),
            (18, 'The Conjuring: Last Rites', 2025, 0, 'N/A', 'N/A', 'Cuando los investigadores paranormales Ed y Lorraine Warren se ven envueltos en otro aterrador caso relacionado con misteriosas criaturas, se ven obligados a resolverlo todo por última vez.', 'N/A'),
            (19, 'Wicked: For Good', 2025, 0, 'N/A', 'N/A', 'Elphaba, la futura Bruja Malvada del Oeste tiene una relación con Glinda, la Bruja Buena del Norte. La segunda de una adaptación cinematográfica en dos partes del musical de Broadway.', 'N/A'),
            (20, 'The Menu', 2022, 1, 2024, '7/10', 'Una joven pareja viaja a una isla remota para comer en un exclusivo restaurante, donde el chef ha preparado un lujoso menú.', 'N/A');`
        );

        // Relaciona películas con géneros (ejemplo)
        await db.run(
            `INSERT INTO peliculas_generos VALUES 
            (1, 1),
            (1, 2),
            (1, 5),
            (2, 4),
            (2, 11),
            (3, 6),
            (3,10),
            (4, 5),
            (4, 7),
            (4, 8),
            (5, 3),
            (5, 7),
            (6, 4),
            (7, 5),
            (7, 8),
            (8, 1),
            (8, 4),
            (8, 7),
            (8, 8),
            (9, 4),
            (9, 5),
            (9, 7),
            (10, 3),
            (10, 4),
            (10, 9),
            (11, 7),
            (11, 8),
            (12, 3),
            (12, 4),
            (12, 9),
            (13, 6),
            (13, 7),
            (14, 5),
            (14, 4),
            (14, 7),
            (15, 5),
            (15, 7),
            (16, 7),
            (16, 8),
            (17, 1),
            (17, 2),
            (17, 4),
            (17, 6),
            (18, 7),
            (18, 8),
            (19, 6),
            (19, 9),
            (19, 10),
            (20, 3),
            (20, 7),
            (20, 8);`
        );       
    }

    // cerrar la base de datos
    db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;