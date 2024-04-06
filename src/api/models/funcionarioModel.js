const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
/*const funcionariosDB = new PouchDB('funcionarios');*/
const funcionariosDB = new PouchDB('http://localhost:5984/funcionarios');


// Função para adicionar um novo funcionário
async function adicionarFuncionario(dadosFuncionario) {
    const funcionario = {
        _id: new Date().toISOString(),
        nome: dadosFuncionario.nome,
        cpf: dadosFuncionario.cpf,
        cargo: dadosFuncionario.cargo,
        salarioBase: dadosFuncionario.salarioBase,
        comissao: dadosFuncionario.comissao,
        horasExtras: {
            quantidade: dadosFuncionario.horasExtras.quantidade,
            valorHoraExtra: dadosFuncionario.horasExtras.valorHoraExtra
        },
        adicionais: {
            noturno: dadosFuncionario.adicionais.noturno,
            insalubridade: dadosFuncionario.adicionais.insalubridade,
            periculosidade: dadosFuncionario.adicionais.periculosidade,
            tempoServico: dadosFuncionario.adicionais.tempoServico
        },
        salarioFamilia: dadosFuncionario.salarioFamilia,
        diariaViagem: dadosFuncionario.diariaViagem,
        auxilioCrecheBaba: dadosFuncionario.auxilioCrecheBaba
    };

    try {
        const resultado = await funcionariosDB.put(funcionario);
        return resultado;
    } catch (erro) {
        throw new Error('Erro ao adicionar funcionário: ' + erro.message);
    }
}

// Função para buscar todos os funcionários
async function buscarFuncionarios() {
    try {
        const resultado = await funcionariosDB.allDocs({ include_docs: true });
        return resultado.rows.map(row => row.doc);
    } catch (erro) {
        throw new Error('Erro ao buscar funcionários: ' + erro.message);
    }
}

//Função para buscar funcionario por ID 
async function buscarFuncionarioPorId(idFuncionario) {
    try {
        const funcionario = await funcionariosDB.get(idFuncionario);
        return funcionario;
    } catch (erro) {
        console.error(erro);
        throw new Error('Erro ao buscar funcionário: ' + erro.message);
    }
}

module.exports = { adicionarFuncionario, buscarFuncionarios, buscarFuncionarioPorId };

