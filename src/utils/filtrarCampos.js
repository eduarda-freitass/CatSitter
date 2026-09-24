// Retorna apenas os campos permitidos do body, evitando que o cliente
// altere campos protegidos (id, status, cuidadorId, etc.).
const filtrarCampos = (body, camposPermitidos) => {
    const dados = {};

    for (const campo of camposPermitidos) {
        if (body[campo] !== undefined) {
            dados[campo] = body[campo];
        }
    }

    return dados;
};

module.exports = filtrarCampos;
