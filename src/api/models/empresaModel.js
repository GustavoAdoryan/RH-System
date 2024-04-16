const PouchDB = require('pouchdb');
const empresasDB = new PouchDB('http://localhost:5984/empresas');

async function adicionarEmpresa(dadosEmpresa) {
    const empresa = {
        _id: new Date().toISOString(), // Ou qualquer outra lógica para ID único que preferir
        cnpj: dadosEmpresa.cnpj,
        nomeFantasia: dadosEmpresa.nomeFantasia,
        endereco: dadosEmpresa.endereco,
        telefone: dadosEmpresa.telefone,
        email: dadosEmpresa.email,
        senha: dadosEmpresa.senha
    };

    try {
        const resultado = await empresasDB.put(empresa);
        return resultado;
    } catch (erro) {
        throw new Error('Erro ao adicionar empresa: ' + erro.message);
    }
}

async function buscarEmpresas() {
    try {
        const resultado = await empresasDB.allDocs({ include_docs: true });
        return resultado.rows.map(row => row.doc);
    } catch (erro) {
        throw new Error('Erro ao buscar empresas: ' + erro.message);
    }
}

async function editarEmpresa(idEmpresa, dadosAtualizados) {
    try {
        const empresa = await empresasDB.get(idEmpresa);
        // Atualiza as informações com os novos dados
        Object.keys(dadosAtualizados).forEach(chave => {
            empresa[chave] = dadosAtualizados[chave];
        });
        const resultado = await empresasDB.put(empresa);
        return resultado;
    } catch (erro) {
        throw new Error('Erro ao editar empresa: ' + erro.message);
    }
}

async function excluirEmpresa(idEmpresa) {
    try {
        const empresa = await empresasDB.get(idEmpresa);
        const resultado = await empresasDB.remove(empresa);
        return resultado;
    } catch (erro) {
        throw new Error('Erro ao excluir empresa: ' + erro.message);
    }
}

async function buscarEmpresaPorId(idEmpresa) {
    try {
        const empresa = await empresasDB.get(idEmpresa);
        return empresa;
    } catch (erro) {
        throw new Error('Erro ao buscar empresa por ID: ' + erro.message);
    }
}

module.exports = { adicionarEmpresa, buscarEmpresas, editarEmpresa, excluirEmpresa, buscarEmpresaPorId };
