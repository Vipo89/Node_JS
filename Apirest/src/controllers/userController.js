const userModel = require("../models/userModel");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    if (users.length === 0) return res.status(200).send("No hay usuarios");
    res.status(200).send({ status: "Sucess", data: users });
  } catch (error) {}
  //Devolver todos usuarios
  res.status(500).send({ status: "Failed", error: error.message });
  //   res.status(200).send("Hola a todos los usuarios");
};

const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);

    const user = await userModel.findById(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Sucess", data: user });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const insertNewUser = async (req, res) => {
  try {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Faltan campos obligatorios" });
    }

    const newUser = {
      name,
      lastName,
      email,
      password,
    };
    const user = await userModel.create(newUser);

    if (!user) {
      return res
        .status(400)
        .send({ status: "Failed", message: "No se ha podido crear un usuario" });
    }
    res.status(200).send({ status: "Succes", message: "El usuario se ha creado correctamente" })
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    console.log(idUser);
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({
      status: "Sucess",
      message: `El usuario con id: ${idUser} ha sido eliminado correctamente`,
    });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

const updateUserbyId = async (req, res) => {
  try {
    const { idUser } = req.params;
    const newUser = req.body;

    const updateUser = await userModel.findByIdAndUpdate(idUser, newUser, {
      new: true,
      runValidators: true,
    });
    if (!updateUser)
      return res.status(200).send("No existe usuario con ese id");
    res.status(200).send({ status: "Success", data: updateUser });
  } catch (error) {
    res.status(500).send({ status: "Failed", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  insertNewUser,
  deleteUserById,
  updateUserbyId,
};
