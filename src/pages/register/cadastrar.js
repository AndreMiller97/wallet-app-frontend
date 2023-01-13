// chamando API para cadastrar com metodo post
const onCallRegister = async (email, name) =>{
    try {
        const data = {
            email,
            name,
        }
        
        const response = await fetch (
            "https://mp-wallet-app-api.herokuapp.com/users",
            {
                // cabeçalho para o metodo post
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials:"same-origin",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );
        const user = await response.json();
        return user;

    } catch (error) {
        return {error}
    }
}

//validando nome e email para poder cadastrar
const onResgister = async () => {
    const name = document.getElementById("input-name").value
    const email = document.getElementById("input-email").value;

    if (name.length < 3 ){
        alert("O nome deve conter mais do que 3 caracteres.")
        return;
    }
    
    if (email.length < 5 || !email.includes("@")){
        alert("O E-mail invalido")
        return;
    }

    const result = await onCallRegister(email,name);

    if (result.error) {
        alert("Falha ao cadastrar")
        return;
    }
    localStorage.setItem("@WalletApp:userEmail", result.email)
    localStorage.setItem("@WalletApp:userName", result.name)
    localStorage.setItem("@WalletApp:userId", result.id)
    window.open("../home/home.html","_self")

}

//função de submit para cadastrar
window.onload = ()=>{
    const form = document.getElementById("form-cadastrar")
    form.onsubmit = (event) => {
        event.preventDefault();
        onResgister()
    }
}
