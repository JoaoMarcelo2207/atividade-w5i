function sair(){
    localStorage.removeItem("token");
    
    
    fetch("/logout", {
        method: "POST"
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message); 
        })
        .catch(error => {
          console.error("Erro no logout:", error);
        });
    window.location.href = "http://localhost:8080/login";
}



