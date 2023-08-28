let email = document.querySelector("#usuario")
let senha = document.querySelector("#senha")

function logar(){
    if (email && senha) {
        const data = {
            email: email.value,
            senha : senha.value,
        };

        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(response => response.json())
        .then(data=>{
            if(data.success){      
                if(data.token){
                    localStorage.setItem("token", JSON.stringify(data.token));
                    const token = JSON.parse(localStorage.getItem("token"));
                    const headers = {
                        "Content-Type": "application/json",
                        authorization:`Bearer ${token}`
                    };
                    fetch("http://localhost:8080/inicio", {
                        method: "GET",
                        headers: headers
                    }).then(response => {
                        if(response.ok){
                            window.location.href = "http://localhost:8080/inicio";
                        }
                        else{
                            console.error("Erro na requisição:", response.statusText);
                        }
                    }).catch(error =>{
                        console.error("Erro na requisição:", error);
                    })
                    
                }
                else{
                    console.log("Não foi retornado um token válido após o login!");
                }
            }
            else{
                msgErro.setAttribute("style", "display: block")
                msgErro.innerHTML = `<strong> Erro ao logar: ${data.message}</strong>`
                msgSucesso.setAttribute("style", "display: none")
                msgSucesso.innerHTML = ""
            }
        })
        .catch(data =>{
            console.error("Erro ao fazer login:", data.error);
            msgErro.setAttribute("style", "display: block")
            msgErro.innerHTML = "<strong> Erro no servidor ao logar </strong>"
            msgSucesso.setAttribute("style", "display: none")
            msgSucesso.innerHTML = ""    
        })

    } else{
        msgErro.setAttribute("style", "display: block")
        msgErro.innerHTML = "<strong> Erro ao logar, preencha todos os campos! </strong>"
        msgSucesso.setAttribute("style", "display: none")
        msgSucesso.innerHTML = ""
    }
}

