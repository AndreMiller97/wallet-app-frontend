
// chamando API para cadastrar com metodo post
const onCallRegister = async (email, name) =>{
    try {
        // passando o body via parametro 
        const data = {
            email,
            name,
        }
        // função fetch do tipo post
        const response = await fetch (
            // url padrao passando a rota de usurarios (users)
            "https://mp-wallet-app-api.herokuapp.com/users",
            {
                // cabeçalho para o metodo post
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials:"same-origin",
                headers:{
                    // headers serve para mandar um objeto java scrit para o body
                    "Content-Type": "application/json",
                },
                // passando o json(objeto) em formato de texto para poder conseguir trafegar na web
                body: JSON.stringify(data),
            }
        );
        // variavel de usuario onde recebe o resultado .json  que vem da do fetch (url do back-and)
        const user = await response.json();
        // retorna o usuario se deu tudo certo
        return user;

    } catch (error) {
        return {error}
    }
}

// função para cadastrar async await
const onResgister = async () => {
    // pegando nome e email via id
    const name = document.getElementById("input-name").value
    const email = document.getElementById("input-email").value;

    // validando nome e email para poder cadastrar
    if (name.length < 3 ){
        alert("O nome deve conter mais do que 3 caracteres.")
        return;
    }
    
    if (email.length < 5 || !email.includes("@")){
        alert("O E-mail invalido")
        return;
    }
    //fazendo a promisse da resposta da API passando o email e nome para fazer a comunicação
    const result = await onCallRegister(email,name);

    if (result.error) {
        alert("Falha ao cadastrar")
        return;
    }

    // setando o e-mail, name e id para fazer o login
    localStorage.setItem("@WalletApp:userEmail", result.email)
    localStorage.setItem("@WalletApp:userName", result.name)
    localStorage.setItem("@WalletApp:userId", result.id)
    window.open("../home/home.html","_self")

}

//função de submit para cadastrar
window.onload = ()=>{
    // pegando o elemendo via id
    const form = document.getElementById("form-cadastrar")

    form.onsubmit = (event) => {
        event.preventDefault();

        //chamando a função para poder fazer o submit de cadastro
        onResgister()
    }
}
