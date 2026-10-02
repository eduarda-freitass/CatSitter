const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    // DB_STORAGE permite mudar o caminho do banco (usado no Docker).
    storage: process.env.NODE_ENV === "test"
        ? "./catsitter-test.sqlite"
        : process.env.DB_STORAGE || "./catsitter.sqlite",
    logging: false
});

module.exports = sequelize;