const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    entrada: { type: Date, default: Date.now },
    saida: { type: Date },
    duracao: { type: Number }
});

const LoginHistory = mongoose.model("LoginHistory", loginHistorySchema);

module.exports = LoginHistory;
