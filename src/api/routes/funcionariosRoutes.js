const express = require('express');
const router = express.Router();
const { criarFuncionario, obterFuncionarios, obterFuncionarioPorId, editarFuncionarioController, obterHolerite } = require('../controllers/funcionariosController');

router.post('/funcionarios', criarFuncionario);
router.get('/funcionarios', obterFuncionarios);
router.get('/funcionarios/:id', obterFuncionarioPorId);
router.put('/funcionarios/:id', editarFuncionarioController);
router.get('/funcionarios/:id/holerite/:mes/:ano', obterHolerite);

module.exports = router;
