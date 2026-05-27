import express from "express"
import path from "path"//Permite trabalhar multiplos caminhos com o servidor
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
//Carrega todas as variaveis de ambiente do arquivo .env
//importa conexão com o banco
import conexao from "./config/database.js";
//importa funções
import { cadastrarUsuario, exibirSucesso, realizarLogin } from "./controllers/authController.js";

const app = express()
//Testa a conexão do banco de dados
conexao.getConnection()
.then(()=>{
    console.log("Banco de dados conectado com sucesso")
})
.catch((erro)=>{
    console.log("Erro ao conectar o banco de dados", erro)
})

const PORT = process.env.PORT 

//middleware para ler dados enviados de formularios HTML
app.use(express.urlencoded({extended: true}))
app.use(express.json())
//middleware para servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, "public")))

//Rota inicial: redireciona para a tela login
app.get("/", (req, res)=>{
    res.redirect("/login.html")
})
//Rota quer recebe os dados dos formularios de cadastro
app.post("/cadastro", cadastrarUsuario)
app.post("/login", realizarLogin)
//Rota de sucesso após login
app.get("/sucesso", exibirSucesso)

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`)
})