const userModel = require("../models/userModel")

const createNewUser =  async(req,res)=> {
try {
    console.log("Hola");
    const {name,lastName,email,password} = req.body

    if (!name || !lastName || !email ||!password) {
        
    }
    res.send("Hola")
} catch (error) {
    
}
}


module.exports = {createNewUser}