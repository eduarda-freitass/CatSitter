const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Solicitacao = sequelize.define("Solicitacao", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    dataVisita: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    horario: {
        type: DataTypes.STRING,
        allowNull: false
    },

    servicos: {
        type: DataTypes.STRING,
        allowNull: false
    },

    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "PENDENTE",
        validate: {
            isIn: [["PENDENTE", "ACEITA", "CONCLUIDA", "CANCELADA"]]
        }
    },

    gatoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cuidadorId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Solicitacao;