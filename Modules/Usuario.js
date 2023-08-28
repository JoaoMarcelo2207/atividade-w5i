const mongoose = require("mongoose");

const Usuario = mongoose.model("User" , {
    nome: String,
    email: String,
    senha: String
});

module.exports = Usuario;
