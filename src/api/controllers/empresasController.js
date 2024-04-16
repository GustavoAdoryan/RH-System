const { adicionarEmpresa, buscarEmpresas, buscarEmpresaPorId, editarEmpresa, excluirEmpresa } = require('../models/empresaModel');

async function criarEmpresa(req, res) {
    try {
        const resultado = await adicionarEmpresa(req.body);
        res.status(201).send(resultado);
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
}

async function obterEmpresas(req, res) {
    try {
        const empresas = await buscarEmpresas();
        res.status(200).json(empresas);
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

async function obterEmpresaPorId(req, res) {
    const { id } = req.params;

    try {
        const empresa = await buscarEmpresaPorId(id);
        res.status(200).json(empresa);
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
}

async function atualizarEmpresa(req, res) {
    const { id } = req.params;
    const dadosAtualizados = req.body;

    try {
        const resultado = await editarEmpresa(id, dadosAtualizados);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
}

async function removerEmpresa(req, res) {
    const { id } = req.params;

    try {
        const resultado = await excluirEmpresa(id);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
}

module.exports = { criarEmpresa, obterEmpresas, obterEmpresaPorId, atualizarEmpresa, removerEmpresa };
