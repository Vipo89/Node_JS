const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  insertNewUser,
  deleteUserById,
  updateUserbyId,
} = require("../controllers/userController");

router.get("/", getAllUsers);

router.get("/:idUser", getUserById);

//Ruta para crear usuario

router.post("/newuser", insertNewUser);


//Ruta para editar un usuario

router.patch("/edit/:idUser",updateUserbyId)

//Ruta para eliminar usuarios
router.delete("/delete/:idUser", deleteUserById);

module.exports = router;
