const PouchDB = require('pouchdb');
const funcionarioModel = require('./funcionarioModel.js'); // Importe o modelo de funcionário

PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('usuarios');

const usuarioModel = {
    // Verifica as credenciais do usuário
    verificarLogin: async function (email, password) {
        try {
            // Busca todos os funcionários
            const funcionarios = await funcionarioModel.buscarFuncionarios();

            // Verifica se o email e senha correspondem a algum funcionário
            const usuario = funcionarios.find(funcionario => funcionario.email === email);
            if (!usuario) {
                return { error: 'Usuário não encontrado', status: 404 };
            }

            // Verifica a senha de maneira assíncrona
            if (usuario.senha === password) {
                // Removendo senha do objeto retornado
                delete usuario.senha;
                return { usuario };
            } else {
                return { error: 'Senha incorreta', status: 401 };
            }
        } catch (error) {
            console.error('Erro ao verificar login:', error);
            return { error: 'Erro ao acessar o banco de dados', status: 500 };
        }
    }
};

module.exports = usuarioModel;
