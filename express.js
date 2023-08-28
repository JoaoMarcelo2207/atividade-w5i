//imports
require("dotenv").config();
const express = require("express");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("./Modules/Usuario");
const LoginHistory = require("./Modules/loginHistory");
const app = express();
const port = 8080;
const path = require("path");
const cors = require("cors");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;;

//conexao com o banco
mongoose.
    connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0atvv1.mzsb7pw.mongodb.net/?retryWrites=true&w=majority`)
    .then(()=>{
        app.listen(port, () => console.log("Conectou ao banco!"));
}).catch((error)=> console.log(error));

//aplicação de dependencias
app.use("/CSS", express.static(path.join(__dirname, "CSS")));
app.use("/JS", express.static(path.join(__dirname, "JS")));
app.use("/HTML", express.static(path.join(__dirname, "HTML")));
app.use("/res", express.static(path.join(__dirname, "res")));
app.use(express.json());
app.use(cors());


//rotas
app.get("/cadastro", (req, res) => {
    const filePath = path.join(__dirname, "HTML", "telaCadastro.html");
    res.sendFile(filePath);
});

app.get("/login" , (req,res) => {
    const filePath = path.join(__dirname, "HTML", "telaLogin.html");
    res.sendFile(filePath);
});

app.get("/inicio" , (req,res) => {
    const filePath = path.join(__dirname, "HTML", "telaInicio.html");
    res.sendFile(filePath);
});

app.post("/login", async (req, res) =>{
    const {email, senha} = req.body;
    if (!email || !senha) {
        return res.status(400).json({ message: "Email e senha são obrigatórios." });
    }
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }
    const checarSenha = await bcrypt.compare(senha, usuario.senha);
    if (!checarSenha) {
        return res.status(401).json({ message: "Credenciais inválidas." });
    }
    try{
        const token = jwt.sign({ userId: usuario._id }, "DKASDAFNMADKSADMASIELSD");
        const loginHistory = new LoginHistory({
            userId: usuario._id,
            entrada: new Date(),
        });
        await loginHistory.save();
        res.status(200).json({ success: true, message: "Login bem-sucedido." , token});

    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }
});

app.post("/logout", async (req, res) => {
    const {email, senha} = req.body;
    try{
        const loginHistory = new LoginHistory({
            userId: usuario._id,
            saida: new Date()
        });
        await loginHistory.save();
        res.status(200).json({ success: true, message: "Logout bem-sucedido." , token});
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro interno do servidor." });
    }


});


app.post("/cadastro", async (req, res) => {
    const {nome , email , senha} = req.body;
    try{    
        const usuarioExistente = await Usuario.findOne({email});
        if(usuarioExistente){
        return res.status(409).json({ sucess: false, message: "Este email já esta cadastrado"});
        }
        const salt = await bcrypt.genSalt(12);
        const senhaHash = await bcrypt.hash(senha, salt);

        //cria usuario
        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaHash,
        });
        await novoUsuario.save();
        res.json({ success: true, message: "Usuário cadastrado com sucesso!"});
        setTimeout(function() {
            app.get("/login" , (req,res) => {
                const filePath = path.join(__dirname, "HTML", "telaLogin.html");
                res.sendFile(filePath);
            });
        }, 2000);

    } catch (error){
        console.error(error);
        res.status(500).json({ success: false, error: "Ocorreu um erro interno no servidor." });
    }
});
