const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Cliente = sequelize.define("Cliente", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Cliente;