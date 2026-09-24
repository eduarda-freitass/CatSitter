const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Gato = sequelize.define("Gato", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    idade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    raca: {
        type: DataTypes.STRING,
        allowNull: false
    },

    peso: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    observacoes: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Gato;