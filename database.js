// Comandos iniciais
// npm init -y
// npm install express mysql2 body-parser \\


// Configurando a Conexão com o Banco

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost', // ou o endereço do seu servidor MySQL
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'clientes_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool;