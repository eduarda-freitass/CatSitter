const bcrypt = require("bcryptjs");

// Gera o hash da senha sempre que ela for criada ou alterada.
const criptografarSenha = async (usuario) => {
    if (usuario.changed("senha")) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
    }
};

// Remove a senha de qualquer resposta JSON.
function semSenha() {
    const dados = { ...this.get() };

    delete dados.senha;

    return dados;
}

module.exports = {
    criptografarSenha,
    semSenha
};
