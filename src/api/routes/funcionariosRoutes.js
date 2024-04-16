const express = require('express');
const router = express.Router();
const { criarFuncionario, obterFuncionarios, obterFuncionarioPorId, editarFuncionarioController, deletarFuncionario, obterHolerite } = require('../controllers/funcionariosController');

router.post('/funcionarios', criarFuncionario);
router.get('/funcionarios', obterFuncionarios);
router.get('/funcionarios/:id', obterFuncionarioPorId);
router.put('/funcionarios/:id', editarFuncionarioController);
router.delete('/funcionarios/:id', deletarFuncionario); // Rota para deletar um funcionário
router.get('/funcionarios/:id/holerite/:mes/:ano', obterHolerite);

module.exports = router;
