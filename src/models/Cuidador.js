const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Cuidador = sequelize.define("Cuidador", {
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
    },

    experiencia: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    valorVisita: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Cuidador;