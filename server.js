// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./database');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Rota para cadastrar um cliente
app.post('/clientes', async (req, res) => {
    try {
        const { nome, endereco, dataInstalacao, vencimentoConta } = req.body;
        const [result] = await pool.query(
            'INSERT INTO clientes (nome, endereco, dataInstalacao, vencimentoConta) VALUES (?, ?, ?, ?)',
            [nome, endereco, dataInstalacao, vencimentoConta]
        );
        res.json({ id: result.insertId, ...req.body });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao cadastrar cliente' });
    }
});

// Rota para listar clientes
app.get('/clientes', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM clientes');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao listar clientes' });
    }
});

// Outras rotas (atualizar, remover) podem ser adicionadas aqui

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});