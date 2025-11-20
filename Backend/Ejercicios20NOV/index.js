const express = require("express");

const cors = require("cors");
const { arrayMovies } = require("./mockedDataMovies");

const server = express();

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

server.get("/", (req, res) => {
  res.send("Bienvenido a mi Api con Express");
});

server.get("/about", (req, res) => {
  res.send(
    JSON.stringify({
      data: "Soy Víctor Jesús Parras Rumbado y esta es mi API de prueba",
    })
  );
});

server.get("/productos", (req, res) => {
  const { categoria, precio } = req.query;
  console.log(categoria, precio);
  res.send(JSON.stringify({ categoria, precio }));
});

server.get("/movies", (req, res) => {
  res.send(JSON.stringify({ arrayMovies }));
});

server.get("/movies/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  const movie = arrayMovies.find((u) => u.id === Number(id));
  console.log(JSON.stringify(movie));

  if (!movie) return res.send("No se ha encontrado la película");
  res.send(JSON.stringify(movie));
});

// EJERCICIO 11:
//   Crear una ruta POST /movies que reciba una película en req.body
//   y la añada al array.
server.post("/movies", (req, res) => {
  const movie = req.body;
  console.log(movie);
  arrayMovies.push(movie);
  // console.log(arrayMovies.length());

  res.send(arrayMovies);
});
//URL ENTERA http://localhost:3000/order/132312/product/213321
server.get("/order/:userId/product/:productId", (req, res) => {
  const { userId, productId } = req.params;

  const { status, priority } = req.query;

  const { quantity, address } = req.body;

  const { auth_token, client_id } = req.headers;

  console.log(userId, productId);

  console.log(status, priority);

  console.log(quantity, address);

  console.log(auth_token, client_id);
  // if (!req.body || !req.headers) {
  //   return res.send("Faltan datos por proporcionar");
  // }

  if (!quantity || !address) {
    return res
      .status(404)
      .send("Faltan campos que son obligatorios en el body");
  }
  if (!auth_token || !client_id) {
    return res
      .status(404)
      .send("Faltan campos que son obligatorios en el header");
  }
  const response = {
    message: "Pedido recibido correctamente",
    routeParams: { userId, productId },
    queryParams: { status, priority },
    bodyParams: { quantity, address },
    headerParams: { auth_token, client_id },
  };
  res.send(JSON.stringify(response));
});

//Ejemplo de endpoint bastante común

server.patch("/users/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  

  res.send("Bro");
});


//Otra petición común que combina body y headers
//Ej: Datos a actualizar el body y autentificación en header con un toker


const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
