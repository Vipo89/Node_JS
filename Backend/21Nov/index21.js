// Inicializamos express y cors(*)
const express = require("express");

// Para poder manejar las solicitudes CORS, usamos la libreria
const cors = require("cors");

//  Ejemplo importacion archivo que simula BBDD Mockeada (Si se necesita)
// const { usuarios } = require("./bbddMockeada/dataUsers");

// Creamos aplicacion con express (server como servidor que creamos)(*)
const server = express();

// Middleware para que analize JSON de las solicitudes(*)
server.use(express.json());

// Configuramos parametrización de CORS(*)
server.use(
  cors({
    origin: "http://localhost:5173", // Url o IP permitida
    methods: ["GET", "POST", "OPTIONS"], // Métodos fetch permitidos
    allowedHeaders: ["Content-Type"], // Cabeceras permitidas
  })
);

// RUTAS
// Aqui irían las rutas
// EJ: server.get("/",(req, res) => {res.send("Hola, mundo!")})

let BBDD = [
  {
    id: 1,
    name: "Alberto",
  },
  {
    id: 2,
    name: "Pedro",
  },
];

server.get("/todos", (req, res) => {
  res.send(JSON.stringify(BBDD));
});


server.post("/todos", (req, res) => {
  const newText = req.body;
  BBDD.push(newText);
  res.send(JSON.stringify(BBDD));
});

server.delete("/todos/:idABorrar", (req, res) => {

  const { idABorrar } = req.params;
  BBDD = BBDD.filter((elem) => elem.id !== Number(idABorrar));
  res.send(JSON.stringify(BBDD));
});


// Configura CORS para permitir peticiones desde tu frontend en http://localhost:5173.
 
// Asegúrate de tener express.json() para leer el body en JSON.
 
// ## Ejercicio 1 – GET /movies
 
// Crea un endpoint que devuelva todas las películas del array bbddMocked.
 
// Si existe -> Respuesta: listado completo en JSON.
// Si no existe -> Respuesta: Mensaje comunicancdo que no hay peliculas para listar
 
// ## Ejercicio 2 – GET /movies/:id
 
// Crea un endpoint que devuelva una película concreta por id.
 
// Si existe → devolver la película.
// Si no existe → status 404 y mensaje "Película no encontrada".
 
// ## Ejercicio 3 – POST /movies
 
// Crea un endpoint para añadir una película nueva al array.
 
// Body (JSON): titulo, descripcion, anio, valoracion, poster_img.
// Se debe verificar en el backEnd que todos los campos llegan.
 
// El servidor generará un id nuevo (incremental).
 
// Si ok -> Respuesta: la película creada con su id.
 
// ## Ejercicio 4 – PUT /movies/:id
 
// Crea un endpoint para reemplazar completamente una película.
 
// Comprobacion en el backend -> Body debe contener todos los campos (titulo, descripcion, anio, valoracion, poster_img).
 
// Si la película no existe → Status 404 y mensaje de error.
// Si se reemplaza ok -> Respuesta: película actualizada.
 
// ## Ejercicio 5 – PATCH /movies/:id/rating
 
// Crea un endpoint para actualizar solo la valoración (valoracion) de una película.
 
// Body (JSON): { "valoracion": 9.5 }
 
// Si la película no existe → Status 404 y mensaje de error.
// Si ok -> Respuesta: película con la nueva valoración.
 
// ## Ejercicio 6 – DELETE /movies/:id
 
// Crea un endpoint para borrar una película.
 
// Si existe → borrarla y devolver mensaje de éxito.
// Si no existe → Status 404 y mensaje de error.

// Puerto a usar en mi server(*)
const PORT = 3000;



// Aqui es donde lanzo el server escuchando en ese puerto(*)
// Esto va lo último. Es donde inicializa en standBy el servidor llamado app
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
