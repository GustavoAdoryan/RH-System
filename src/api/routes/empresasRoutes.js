const express = require('express');
const router = express.Router();
const { criarEmpresa, obterEmpresas, obterEmpresaPorId, atualizarEmpresa, removerEmpresa } = require('../controllers/empresasController');

router.post('/empresas', criarEmpresa);
router.get('/empresas', obterEmpresas);
router.get('/empresas/:id', obterEmpresaPorId); // Rota para buscar uma empresa por ID
router.put('/empresas/:id', atualizarEmpresa);
router.delete('/empresas/:id', removerEmpresa);

module.exports = router;
