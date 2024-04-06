const express = require('express');
const router = express.Router();
const { criarFuncionario, obterFuncionarios, obterFuncionarioPorId, obterHolerite} = require('../controllers/funcionariosController');

router.post('/funcionarios', criarFuncionario);
router.get('/funcionarios', obterFuncionarios);
router.get('/funcionarios/:id', obterFuncionarioPorId);
router.get('/funcionarios/:id/holerite/:mes/:ano', obterHolerite);

module.exports = router;
