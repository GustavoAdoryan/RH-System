const express = require('express');
const router = express.Router();
const { verificarLogin } = require('../models/funcionarioModel'); // Certifique-se de que o nome da função está correto aqui

router.post('/login', async (req, res) => {
    try {
        const funcionario = await verificarLogin(req.body.email, req.body.senha);
        if (funcionario) {
            res.status(200).json({ mensagem: "Login bem-sucedido", funcionario });
        } else {
            res.status(401).json({ mensagem: "E-mail ou senha inválidos" });
        }
    } catch (erro) {
        // Ajuste o código de status de erro se for um erro de servidor e não apenas uma falha de autenticação
        const statusCode = erro.message.includes('Erro ao verificar login') ? 500 : 401;
        res.status(statusCode).json({ mensagem: erro.message });
    }
});

module.exports = router;
