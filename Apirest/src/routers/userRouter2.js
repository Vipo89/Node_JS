const express = require("express");
const { createNewUser } = require("../controllers/user2Controller");
const router = express.Router();


router.post("/newuser",createNewUser)

module.exports = router;
