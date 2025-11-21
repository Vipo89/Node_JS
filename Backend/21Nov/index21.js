// Inicializamos express y cors(*)
const express = require("express");

// Para poder manejar las solicitudes CORS, usamos la libreria
const cors = require("cors");
const movies = require("./DDBBmockedData/mockedData");

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
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Métodos fetch permitidos
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

server.get("/movies", (req, res) => {
  if (movies.length === 0) {
    return res.send("No hay películas para listar");
  }
  res.send(JSON.stringify(movies));
});

// ## Ejercicio 2 – GET /movies/:id

// Crea un endpoint que devuelva una película concreta por id.

// Si existe → devolver la película.
// Si no existe → status 404 y mensaje "Película no encontrada".

server.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const findFilm = movies.find((movie) => movie.id === Number(id));

  if (!findFilm) {
    return res.status(404).send("Película no encontrada");
  }
  res.send(JSON.stringify(findFilm));
});
// ## Ejercicio 3 – POST /movies

// Crea un endpoint para añadir una película nueva al array.

// Body (JSON): titulo, descripcion, anio, valoracion, poster_img.
// Se debe verificar en el backEnd que todos los campos llegan.

// El servidor generará un id nuevo (incremental).

// Si ok -> Respuesta: la película creada con su id.

server.post("/movies", (req, res) => {
  const { titulo, descripcion, anio, valoracion, poster_img } = req.body;

  if (!titulo || !descripcion || !anio || !valoracion || !poster_img) {
    return res.status(400).send("Faltan campos obligatorios");
  }

  const idxs = [...movies].map((m) => m.id);

  // console.log(idxs);

  const max = idxs.sort((a,b) => b-a);

  // console.log(max[0]);

  const newMovie = {
    id: max[0] + 1,
    titulo,
    descripcion,
    anio,
    valoracion,
    poster_img,
  };

  movies.push(newMovie);

  return res.status(201).json(newMovie);
});

// ## Ejercicio 4 – PUT /movies/:id

// Crea un endpoint para reemplazar completamente una película.

// Comprobacion en el backend -> Body debe contener todos los campos (titulo, descripcion, anio, valoracion, poster_img).

// Si la película no existe → Status 404 y mensaje de error.
// Si se reemplaza ok -> Respuesta: película actualizada.

server.put("/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descripcion, anio, valoracion, poster_img } = req.body;

  if (!titulo || !descripcion || !anio || !valoracion || !poster_img) {
    return res.status(400).send({ message: "Faltan campos obligatorios" });
  }

  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Película no encontrada" });
  }

  const newMovie = {
    id,
    titulo,
    descripcion,
    anio,
    valoracion,
    poster_img,
  };

  movies[index] = newMovie;

  return res.send(movies);
});

// ## Ejercicio 5 – PATCH /movies/:id/rating

// Crea un endpoint para actualizar solo la valoración (valoracion) de una película.

// Body (JSON): { "valoracion": 9.5 }

// Si la película no existe → Status 404 y mensaje de error.
// Si ok -> Respuesta: película con la nueva valoración.
// /movies/4/rating
server.patch("/movies/:id/rating", (req, res) => {
  const id = Number(req.params.id);
  const { valoracion } = req.body;

  // console.log(valoracion);

  const filmToChange = movies.find((m) => m.id === id);

  // console.log(filmToChange);
  filmToChange.valoracion = valoracion;

  const index = movies.findIndex((movie) => movie.id === id);

  if (!index) {
    return res
      .status(404)
      .send({ message: "Ese índice no contiene ninguna película" });
  }

  movies[index] = filmToChange;

  console.log(movies);

  res.send(JSON.stringify(filmToChange));
});

// ## Ejercicio 6 – DELETE /movies/:id

// Crea un endpoint para borrar una película.

// Si existe → borrarla y devolver mensaje de éxito.
// Si no existe → Status 404 y mensaje de error.

server.delete("/movies/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = movies.findIndex((movie) => movie.id === id);

  if (index === -1) {
    return res.status(404).send({ message: "Película no encontrada" });
  }
  movies.splice(index, 1);

  console.log(movies);
  res.send({ message: "Película eliminada correctamente" });
});

// Puerto a usar en mi server(*)
const PORT = 3000;

// Aqui es donde lanzo el server escuchando en ese puerto(*)
// Esto va lo último. Es donde inicializa en standBy el servidor llamado app
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
