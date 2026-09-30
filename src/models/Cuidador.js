const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");
const { criptografarSenha, semSenha } = require("../utils/senha");

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
}, {
    // Não carrega a senha nas consultas (inclusive em includes).
    defaultScope: {
        attributes: { exclude: ["senha"] }
    },

    hooks: {
        beforeSave: criptografarSenha
    }
});

Cuidador.prototype.toJSON = semSenha;

module.exports = Cuidador;