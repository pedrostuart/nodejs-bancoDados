//organizando código, Controllers usado geralmente para armazenar as requisições HTTP e separar da parte das rotas

import conexao from "../config/database.js"

export async function cadastrarUsuario(req, res) {
    try{
        //Criando 3 constantes e guardando a requisição.body dentro de cada uma delas
        const {nome, email, senha} = req.body

        if(!nome || !email || !senha){//se algum desses for vazio
            /*send vai meio que levar pa outra página */
            return res.send(`
                <h1>Erro no cadastro</h1>
                <p>Preencha todos os campos</p>
                <a href='/cadastro.html'>Voltar</a>
            `)
        }
        //verifica se ja existe um usario com o mesmo email
        const [usuarioExitente] = await conexao.query(//query ta buscando emais da lista e await sei la
            "SELECT * FROM usuarios WHERE email = ?",
            [email] 
        )

        if(usuarioExitente.length>0){
            return res.redirect("/cadastro.html?erro=email")
        }
        //Sucesso cadastrando usuario
        await conexao.query(
            "INSERT INTO usuarios(`nome`, `email`, `senha`) VALUES (?,?,?)",
            [nome, email, senha]
        )
        //redirecionando para o login com mensagem de casdastro efetuado com sucesso
        res.redirect("/login.html?cadastro=sucesso")

    }catch (erro){
        console.log("Erro ao cadastrar o usário", erro)
        res.send("Erro ao cadastrar usuário")
    }
}

export async function realizarLogin(req, res) {
    try{
        const {email, senha} = req.body

        const [usuarios] = await conexao.query(
            "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
            [email, senha]
        )
        if(usuarios.length === 0){
            return res.redirect("/login.html?erro=login")
        }
        //Pega o usuario encontrado
        const usuario = usuarios[0]
        //Redireciona para pagina de acesso
        res.redirect(`/sucesso?nome=${usuario.nome}`)
    }catch{
        console.log("Erro ao realizar login", erro)
        res.send("Erro ao realizar login")
    }
    
}
//Exibir página de sucesso
export function exibirSucesso(req, res){
    const nome = req.query.nome
    res.send(`
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Login realizado</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <main class="container">
            <section class="card">
            <h1>Login realizado com sucesso!</h1>
            <p>Bem-vindo(a), ${nome}.</p>
            <a class="link-button" href="/login.html">Voltar para o login</a>
        </section>
        </main>
    </body>
    </html>
    `);
}