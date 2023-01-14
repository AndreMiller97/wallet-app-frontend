// fazendo requisição na API para validar se o email existe ou não
const validateUser = async (email) =>{
    try {
        //função fetch do tipo get para fazer a chamada da api 
        const result = await fetch(
            // utilizando a url padrao da api para consulta passando a rota e utilizando query também passando o parametro (email)
            `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
            )
            // variavel de usuario onde recebe o resultado .json  que vem da do fetch (url do back-and)
            const user = await result.json()
            // retorna o usuario se deu tudo certo
            return user
    } catch (error) {
        return {error}
    }
}

// validação de e-mail valido ou invalido utilizando async await
const onClickLogin = async () =>{
    const email = document.getElementById("input-email").value;
    if (email.length <5 || !email.includes('@')){
        alert("E-mail invalido!")
        return;
    }
    //fazendo a promisse do validateUser passando o email para fazer a comunicação
    const result = await validateUser(email)
    if(result.error){
        alert("Falha ao validar E-mail!")
        return
    }
    // setando o e-mail, name e id para fazer o login
    localStorage.setItem("@WalletApp:userEmail", result.email)
    localStorage.setItem("@WalletApp:userName", result.name)
    localStorage.setItem("@WalletApp:userId", result.id)
    window.open("./src/pages/home/home.html", "_self")

}