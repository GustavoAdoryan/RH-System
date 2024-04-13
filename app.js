const express = require('express');
const funcionariosRoutes = require('./src/api/routes/funcionariosRoutes');
const empresasRoutes = require('./src/api/routes/empresasRoutes');
const authRoutes = require('./src/api/routes/authRoutes');



const app = express();
app.use(express.json()); // Middleware para analisar o corpo da requisição em JSON

app.use('/api', funcionariosRoutes);
app.use('/api', empresasRoutes);
app.use('/api', authRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
