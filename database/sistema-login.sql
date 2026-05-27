/*Dados banco de dados, para caso uma pessoa queira baixar meu codigo ela vai ter o banco de dados*/

CREATE DATABASE sistema_login

USE sistema_login

create table usuarios(
	id int auto_increment primary key,
    nome varchar(100) not null,
    email varchar(100) not null,
    senha varchar(100) not null
)