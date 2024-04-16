const PouchDB = require('pouchdb');
const funcionarioModel = require('./funcionarioModel.js'); // Importe o modelo de funcionário
const empresaModel = require('./empresaModel.js'); // Importe o modelo de empresa

PouchDB.plugin(require('pouchdb-find'));
const db = new PouchDB('usuarios');

const usuarioModel = {
    // Verifica as credenciais do usuário
    verificarLogin: async function (email, password) {
        try {
            // Busca todos os funcionários
            const funcionarios = await funcionarioModel.buscarFuncionarios();
            // Busca todas as empresas
            const empresas = await empresaModel.buscarEmpresas();

            // Verifica se o email e senha correspondem a algum funcionário
            const funcionario = funcionarios.find(funcionario => funcionario.email === email && funcionario.senha === password);
            if (funcionario) {
                // Removendo senha do objeto retornado
                delete funcionario.senha;
                return { usuario: funcionario, tipo: 'funcionario' };
            }

            // Verifica se o email e senha correspondem a alguma empresa
            const empresa = empresas.find(empresa => empresa.email === email && empresa.senha === password);
            if (empresa) {
                // Removendo senha do objeto retornado
                delete empresa.senha;
                return { usuario: empresa, tipo: 'empresa' };
            }

            // Se nenhum usuário foi encontrado, retorna um erro de usuário não encontrado
            return { error: 'Usuário não encontrado', status: 404 };
        } catch (error) {
            console.error('Erro ao verificar login:', error);
            return { error: 'Erro ao acessar o banco de dados', status: 500 };
        }
    }
};

module.exports = usuarioModel;
