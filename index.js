// fazendo requisição na API para validar se o email existe ou não
const validateUser = async (email) =>{
    try {
        const result = await fetch(
            `https://mp-wallet-app-api.herokuapp.com/users?email=${email}`
            )
            const user = await result.json()
            return user
    } catch (error) {
        return {error}
    }
}

// validação de e-mail valido ou invalido
const onClickLogin = async () =>{
    const email = document.getElementById("input-email").value;
    if (email.length <5 || !email.includes('@')){
        alert("E-mail invalido!")
        return;
    }
    const result = await validateUser(email)
    if(result.error){
        alert("Falha ao validar E-mail!")
        return
    }
    // setando o e-mail para fazer o login
    localStorage.setItem("@WalletApp:userEmail", result.email)
    localStorage.setItem("@WalletApp:userName", result.name)
    localStorage.setItem("@WalletApp:userId", result.id)
    window.open("./src/pages/home/home.html", "_self")

}