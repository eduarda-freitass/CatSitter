const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.NODE_ENV === "test"
        ? "./catsitter-test.sqlite"
        : "./catsitter.sqlite",
    logging: false
});

module.exports = sequelize;