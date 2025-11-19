const http = require("http");
const { json } = require("stream/consumers");

const fakeUsers = [
  {
    email: "loquete@gmail.com",
    password: "loquete",
    status:"admin",
  },
  {
    email: "loquete2@gmail.com",
    password: "loquete2",
    status:"user",

  },
  {
    email: "loquete2@gmail.com",
    password: "loquete2",
    status:"user",

  },
];

const server = http.createServer((req, res) => {

  console.log(req.url);

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("!Bienvenido a mi primer servidor!");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(
      JSON.stringify({ data: "Acerca de mí: Víctor Jesús Parras Rumbado" })
    );
  } else if (req.method === "GET" && req.url === "/contact") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(
      JSON.stringify({ data: "Puedes contactar en: vipoo.info@gmail.com" })
    );
  } else if (req.method === "POST" && req.url === "/login") {
    res.writeHead(200, { "content-type": "text/plain" });
    const {email,contraseña} = req.body;
    console.log(email);
    console.log(contraseña);
    
    fakeUsers.forEach(user => {
        if (user.email === email && user.password === contraseña && user.status === "admin")  {
            res.end(JSON.stringify(user))
        }
        else{
            res.end("Este usuario no está o no es administrador")
        }
    });
    
    // res.end(JSON.stringify(ahora.getHours()));
  } else if (req.method === "GET" && req.url === "/info") {
    res.writeHead(200, { "content-type": "text/plain" });
    const data = {
      curso: "Node.js",
      alumno: "Víctor Jesús Parras Rumbado",
      año: 2025,
    };
    
    res.end(JSON.stringify(data));
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("No se ha encontrado la ruta");
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
