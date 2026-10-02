// Middleware de erro central: recebe qualquer erro lançado nas rotas
// (o Express 5 encaminha para cá os erros das funções async) e
// responde sempre em JSON, com o status HTTP adequado.
const tratarErros = (err, req, res, next) => {
    // JSON mal formado no corpo da requisição (vem do express.json)
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            erro: "JSON inválido no corpo da requisição."
        });
    }

    // Valor repetido em campo único (ex.: email já cadastrado)
    if (err.name === "SequelizeUniqueConstraintError") {
        const campo = err.errors?.[0]?.path;

        return res.status(409).json({
            erro: campo
                ? `Já existe um cadastro com esse ${campo}.`
                : "Registro duplicado."
        });
    }

    // Dados que não passaram nas validações do model (ex.: email inválido)
    if (err.name === "SequelizeValidationError") {
        const campos = [...new Set(err.errors.map((e) => e.path))];

        return res.status(400).json({
            erro: `Dados inválidos: ${campos.join(", ")}.`
        });
    }

    // Registro ainda referenciado por outro (ex.: excluir cliente com gatos)
    if (err.name === "SequelizeForeignKeyConstraintError") {
        return res.status(409).json({
            erro: "Operação não permitida: existem registros vinculados."
        });
    }

    console.error(err);

    res.status(500).json({
        erro: "Erro interno do servidor."
    });
};

module.exports = tratarErros;
