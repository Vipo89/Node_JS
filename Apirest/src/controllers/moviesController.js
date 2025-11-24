const getAllMovies = (req,res) => {

//Devolver todas las películas

res.status(200).send("Aquí tienes el listado de películas")

}

module.exports = {getAllMovies}