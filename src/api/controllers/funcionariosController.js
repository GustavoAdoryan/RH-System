const { adicionarFuncionario, buscarFuncionarios, buscarFuncionarioPorId, editarFuncionario, excluirFuncionario } = require('../models/funcionarioModel');
const { gerarHolerite } = require('../services/holeriteService');

// Adicionando um novo funcionário
async function criarFuncionario(req, res) {
    try {
        const resultado = await adicionarFuncionario(req.body);
        res.status(201).send(resultado);
    } catch (erro) {
        res.status(400).send({ erro: erro.message });
    }
}

// Controlador para buscar todos os funcionários
async function obterFuncionarios(req, res) {
    try {
        const funcionarios = await buscarFuncionarios();
        res.status(200).json(funcionarios);
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

// Controlador para buscar um funcionário por ID
async function obterFuncionarioPorId(req, res) {
    const id = req.params.id; // O Express coloca os parâmetros da URL em req.params

    try {
        const funcionario = await buscarFuncionarioPorId(id);
        if (funcionario) {
            res.status(200).json(funcionario);
        } else {
            res.status(404).send({ mensagem: "Funcionário não encontrado" });
        }
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

// Controlador para editar um funcionário
async function editarFuncionarioController(req, res) {
    const id = req.params.id; // ID do funcionário a ser editado
    const dadosAtualizados = req.body; // Dados para atualizar

    try {
        const resultado = await editarFuncionario(id, dadosAtualizados);
        res.status(200).send(resultado);
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

// Controlador para deletar um funcionário
async function deletarFuncionario(req, res) {
    const id = req.params.id; // ID do funcionário a ser deletado

    try {
        const resultado = await excluirFuncionario(id);
        res.status(200).send({ mensagem: "Funcionário deletado com sucesso" });
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

// Controlador para obter holerite
async function obterHolerite(req, res) {
    try {
        const { id, mes, ano } = req.params;
        const holerite = await gerarHolerite(id, mes, ano);
        res.json(holerite);
    } catch (erro) {
        res.status(500).send({ erro: erro.message });
    }
}

module.exports = { criarFuncionario, obterFuncionarios, obterFuncionarioPorId, editarFuncionarioController, deletarFuncionario, obterHolerite };
