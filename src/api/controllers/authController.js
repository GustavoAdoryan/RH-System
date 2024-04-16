const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuarioModel');

const authController = {
    login: async function (req, res) {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
        }

        try {
            const resultado = await usuarioModel.verificarLogin(email, password);
            if (resultado.usuario) {
                const token = jwt.sign({ id: resultado.usuario._id }, 'chave_secreta', { expiresIn: '1h' });
                return res.status(200).json({ message: 'Login realizado com sucesso', token });
            } else {
                return res.status(resultado.status || 401).json({ message: resultado.error || 'E-mail ou senha inválidos' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao processar login', error });
        }
    }
};

module.exports = authController;
