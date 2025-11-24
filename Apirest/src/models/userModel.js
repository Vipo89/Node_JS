const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 5 caracteres"],
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"],
    unique: [true, "El email está ya registrado"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatorio"],
  },
  role: {
    type: String,
    enum:["user","admin"],
    default: "user",
  },
});


const userModel = mongoose.model("User", userSchema, "users");

module.exports = userModel