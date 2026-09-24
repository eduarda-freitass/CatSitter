const Cliente = require("./Cliente");
const Cuidador = require("./Cuidador");
const Gato = require("./Gato");
const Solicitacao = require("./Solicitacao");

// Cliente 1:N Gato
Cliente.hasMany(Gato, {
    foreignKey: "clienteId",
    onDelete: "CASCADE"
});

Gato.belongsTo(Cliente, {
    foreignKey: "clienteId"
});

// Gato 1:N Solicitacao
Gato.hasMany(Solicitacao, {
    foreignKey: "gatoId",
    onDelete: "CASCADE"
});

Solicitacao.belongsTo(Gato, {
    foreignKey: "gatoId"
});

// Cuidador 1:N Solicitacao
Cuidador.hasMany(Solicitacao, {
    foreignKey: "cuidadorId"
});

Solicitacao.belongsTo(Cuidador, {
    foreignKey: "cuidadorId"
});

module.exports = {
    Cliente,
    Cuidador,
    Gato,
    Solicitacao
};