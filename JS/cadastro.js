let nome = document.querySelector("#nome")
let nomeLabel = document.querySelector("#nomeLabel")
let validNome = false

let email = document.querySelector("#email")
let emailLabel = document.querySelector("#emailLabel")
let validEmail = false

let senha = document.querySelector("#senha")
let senhaLabel = document.querySelector("#senhaLabel")
let validSenha = false

let confirmarSenha = document.querySelector("#ConfirmarSenha")
let confirmarSenhaLabel = document.querySelector("#confirmarSenhaLabel")
let validConfirmarSenha = false;

let msgErro = document.querySelector("#msgErro")
let msgSucesso = document.querySelector("#msgSucesso")


nome.addEventListener("keyup", ()=>{
    if(nome.value.length <= 2){
        nomeLabel.setAttribute("style", "color: red")
        nome.setAttribute("style", "border-color: red")
        nomeLabel.innerHTML = "<strong> Nome *Insira no minimo 3 caracteres* </strong>"
        validNome = false
    }
    else{
        nomeLabel.setAttribute("style", "color: green")
        nome.setAttribute("style", "border-color: green")
        nomeLabel.innerHTML = "Nome"
        validNome = true
    }
})

email.addEventListener("keyup", ()=>{
    if(email.value.length <= 2){
        emailLabel.setAttribute("style", "color: red")
        email.setAttribute("style", "border-color: red")
        emailLabel.innerHTML = "<strong> Email *Insira no minimo 3 caracteres* </strong>"
        validEmail = false
    }
    else{
        emailLabel.setAttribute("style", "color: green")
        email.setAttribute("style", "border-color: green")
        emailLabel.innerHTML = "Email"
        validEmail = true
    }
})

senha.addEventListener("keyup", ()=>{
    if(senha.value.length < 5){
        senhaLabel.setAttribute("style", "color: red")
        senha.setAttribute("style", "border-color: red")
        senhaLabel.innerHTML = "<strong> Senha *Insira no minimo 5 caracteres* </strong>"
        validSenha = false
    }
    else{
        senhaLabel.setAttribute("style", "color: green")
        senha.setAttribute("style", "border-color: green")
        senhaLabel.innerHTML = "Senha"
        validSenha = true
    }
})

confirmarSenha.addEventListener("keyup", ()=>{
    if(senha.value != confirmarSenha.value){
        confirmarSenhaLabel.setAttribute("style", "color: red")
        confirmarSenha.setAttribute("style", "border-color: red")
        confirmarSenhaLabel.innerHTML = "<strong> Confirmar a senha *As senhas não são iguais* </strong>"
        validConfirmarSenha = false
    }
    else{
        confirmarSenhaLabel.setAttribute("style", "color: green")
        confirmarSenha.setAttribute("style", "border-color: green")
        confirmarSenhaLabel.innerHTML = "Confirmar a senha"
        validConfirmarSenha = true
    }
})


function cadastrar(){
    if(validNome && validEmail && validSenha && validConfirmarSenha){
        const data = {
            nome: nome.value,
            email: email.value,
            senha : senha.value,
        };

        fetch("/cadastro" , {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data=>{
            if(data.success){
                console.log("Usuário cadastrado com sucesso!");
                msgSucesso.setAttribute("style", "display: block")
                msgSucesso.innerHTML = "<strong> Cadastro realizado com sucesso! </strong>"
                msgErro.setAttribute("style", "display: none")
                msgErro.innerHTML = ""
            }
            else{
                console.error("Erro: ", error);
                msgErro.setAttribute("style", "display: block")
                msgErro.innerHTML = `<strong> Erro ao cadastrar, erro: ${data.message} </strong>`
                msgSucesso.setAttribute("style", "display: none")
                msgSucesso.innerHTML = ""
            }
          
        })
        .catch(data => {
            console.error("Erro: ", data.error);
            msgErro.setAttribute("style", "display: block")
            msgErro.innerHTML = `<strong> Erro ao cadastrar, erro no servidor </strong>`
            msgSucesso.setAttribute("style", "display: none")
            msgSucesso.innerHTML = ""
        });
    }
    else {
        msgErro.setAttribute("style", "display: block")
        msgErro.innerHTML = "<strong> Erro ao cadastrar, preencha os campos com valores validos! </strong>"
        msgSucesso.setAttribute("style", "display: none")
        msgSucesso.innerHTML = ""
    }


}

