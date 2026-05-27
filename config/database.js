//aqui vai ser feito a conexão com o banco de dados.
import mysql2 from 'mysql2/promise'
import dotenv from "dotenv"
dotenv.config()
const conexao = mysql2.createPool({//CreatePool Gerencia informações do banco de dados, ele puxa dados
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
export default conexao

