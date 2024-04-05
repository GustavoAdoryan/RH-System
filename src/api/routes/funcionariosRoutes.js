const express = require('express');
const router = express.Router();
const { criarFuncionario, obterFuncionarios, obterFuncionarioPorId} = require('../controllers/funcionariosController');

router.post('/funcionarios', criarFuncionario);
router.get('/funcionarios', obterFuncionarios);
router.get('/funcionarios/:id', obterFuncionarioPorId);

module.exports = router;
