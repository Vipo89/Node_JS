require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDatabase = require("./src/db/connectDb");
const userRouter = require("./src/routers/userRouter");
const moviesRouter = require("./src/routers/moviesRouter")
const userRouter2 = require("./src/routers/userRouter2")
const PORT = Number(process.env.PORT || 3000);

const server = express();
server.use(express.json());

connectToDatabase();

server.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","PUT","PATCH","DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

server.get("/", (req, res) => {
  res.send("Hola");
});

// Router for users
server.use("/api/users", userRouter);

//Router for movies
server.use("/api/movies", moviesRouter);

server.use("/api/users2",userRouter2)



server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
