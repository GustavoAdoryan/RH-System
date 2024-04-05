const PouchDB = require('pouchdb');
const empresasDB = new PouchDB('http://localhost:5984/empresas');

async function adicionarEmpresa(dadosEmpresa) {
    const empresa = {
        _id: new Date().toISOString(), // Ou qualquer outra lógica para ID único que preferir
        cnpj: dadosEmpresa.cnpj,
        nomeFantasia: dadosEmpresa.nomeFantasia,
        endereco: dadosEmpresa.endereco,
        telefone: dadosEmpresa.telefone
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

module.exports = { adicionarEmpresa, buscarEmpresas };
