//Inicializamos express y cors(*)
const express = require("express");
const cors = require("cors");
const { usuarios } = require("./bbddMockedData/mockedData");


//Crear una aplciación de Express(*)
const app = express();

//Para poer manejar las solicitudes CORS usamos la librería
//npm i cors

//Middleware básico para analizar JSON en las solicitudes(*)
app.use(express.json());

app.use(
  cors({
    origin:"http://localhost:5173",
    methods:["GET" ,"POST","OPTIONS"],
    allowedHeaders:["Content-type"]
  }))

//RUTAS
//EndPoint principal o raíz(*)
app.get("/", (req, res) => {
  res.send("Hola, mundo");
});

//EndPoint de about
app.get("/about", (req, res) => {
  res.send(
    JSON.stringify({ data: "Acerca de mí: Víctor Jesús Parras Rumbado" })
  );
});

//EndPoint de contact
app.get("/contact", (req, res) => {
  res.send(
    JSON.stringify({ data: "Puedes contactar en: vipoo.info@gmail.com" })
  );
});

//EndPoint de info
app.get("/info", (req, res) => {
  const dataUser = {
    curso: "Node.js",
    alumno: "Víctor Jesús Parras Rumbado",
    año: 2025,
  };
  res.send(JSON.stringify({ status: "Sucess", data: dataUser }));
});

//EndPoint de hora
app.get("/hora", (req, res) => {
  const ahora = new Date().toISOString();
  res.send(JSON.stringify({ data: ahora }));
});

//Endpoint de login

app.post("/login", (req, res) => {
  const { email, pass:password } = req.body;

  //Busca dentro del array de usuarios si hay algun usuario que coincida tanto email como contraseña con los que nos ha pasado
  const usuario = usuarios.find(
    (u) => u.email === email && u.pass === password
  );

  //No se encuentra el usuario
  if (!usuario) {
    return res.status(200).json({
      status: "Failed",
      message: "Email o contraseña incorrectos",
    });
  }

  //Si el rol no es administrador devolvemos un objeto con status failed y el mensaje
  if (usuario.role !== "admin") {
    return res.status(200).json({
      status: "Failed",
      message: "No tiene permisos de administrador",
    });
  }

  //
  res.status(200).json({
    status: "Success",
    userData: usuario,
  });
});

//Ruta principal(*)
const PORT = 3000;

//Iniciar el servidor(*)
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
