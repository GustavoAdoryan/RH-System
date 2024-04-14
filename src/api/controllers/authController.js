const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const authController = {
    // Login de usuário
    login: async function (req, res) {
        const { email, password } = req.body;

        // Verifica se é um login de administrador
        if (email === "admin@gmail.com" && password === "admin") {
            // Criação do token JWT para o administrador
            const token = jwt.sign({ email, type: 'empresa' }, 'chave_secreta', { expiresIn: '1h' });
            res.status(200).send({ message: 'Login de admin realizado com sucesso', token });
            return;
        }

        // Verificação padrão de login para outros usuários
        const usuario = await usuarioModel.verificarLogin(email, password);
        if (usuario) {
            // Criação do token JWT para usuários normais
            const token = jwt.sign({ id: usuario._id }, 'chave_secreta', { expiresIn: '1h' });
            res.status(200).send({ message: 'Login realizado com sucesso', token });
        } else {
            res.status(401).send({ message: 'E-mail ou senha inválidos' });
        }
    }
};

module.exports = {verificarLogin};
