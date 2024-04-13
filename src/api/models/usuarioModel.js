const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));
const bcrypt = require('bcrypt');
const db = new PouchDB('usuarios');

const usuarioModel = {
    // ... outras funções ...

    // Verifica as credenciais do usuário
    verificarLogin: async function (email, password) {
        try {
            const result = await db.find({
                selector: {
                    email: email,
                    type: 'user'
                },
                limit: 1
            });
            const usuario = result.docs[0];
            if (usuario && bcrypt.compareSync(password, usuario.password)) {
                // Se a senha estiver correta, retorne o usuário (sem a senha)
                delete usuario.password;
                return usuario;
            } else {
                // Senha incorreta ou usuário não encontrado
                return null;
            }
        } catch (error) {
            throw error;
        }
    }
};

module.exports = usuarioModel;
