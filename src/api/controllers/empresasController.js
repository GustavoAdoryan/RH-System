const { adicionarEmpresa, buscarEmpresas } = require('../models/empresaModel');

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

module.exports = { criarEmpresa, obterEmpresas };
