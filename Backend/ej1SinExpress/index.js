

const http = require("http");

const server = http.createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("!Hola, NodeJs está funcionando en GET!");
  } else if (req.method === "POST" && req.url === "/") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("!Hola, NodeJs está funcionando en POST!");
  } else if (req.method === "GET" && req.url === "/info") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("!Hola, NodeJs está funcionando con información!");
  } else if (req.method === "GET" && req.url === "/login") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("!Hola, NodeJs está funcionando con información!");
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("No se ha encontrado la ruta");
  }
});

server.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
