/* cria o banco */
CREATE DATABASE clientes_db;
USE clientes_db;

/* Cria a tabela dos clientes */
CREATE TABLE clientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    dataInstalacao DATE,
    vencimentoConta DATE
);