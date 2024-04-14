const express = require('express');
const router = express.Router();
const { verificarLogin } = require('../models/usuarioModel');

router.post('/login', async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ mensagem: "O corpo da requisição não pode estar vazio." });
    }

    const { email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({ mensagem: "E-mail e senha são obrigatórios." });
    }

    try {
        const resultado = await verificarLogin(email, senha);
        if (resultado.usuario) {
            res.status(200).json({ mensagem: "Login bem-sucedido", usuario: resultado.usuario });
        } else {
            res.status(resultado.status || 401).json({ mensagem: resultado.error });
        }
    } catch (erro) {
        const statusCode = erro.message.includes('Erro ao verificar login') ? 500 : 401;
        res.status(statusCode).json({ mensagem: erro.message });
    }
});

module.exports = router;
