import React from "react";

function Inicio() {
  return (
    <div className="mt-4 p-5 rounded" style={{backgroundColor:"lightgray"}} >

      <h1>Pymes 2023</h1>
      <p>Pagina realizada con las siguientes tecnologias:</p>
      <p><b>Backend:</b> NodeJS, Express, WebApiRest, Swagger, Sequelize, Sqlite y capas en JavaScript.</p>
      <p><b>Frontend:</b> Single Page Application, HTML, CSS, Bootstrap, NodeJS, JavaScript y React.</p>
      <button className="btn btn-lg btn-primary">
        <i className="fa fa-search"> </i>
        Ver Generos Peliculas
      </button>
    </div>
  );
}


export { Inicio };