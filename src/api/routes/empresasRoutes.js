const express = require('express');
const router = express.Router();
const { criarEmpresa, obterEmpresas } = require('../controllers/empresasController');

router.post('/empresas', criarEmpresa);
router.get('/empresas', obterEmpresas);

module.exports = router;
