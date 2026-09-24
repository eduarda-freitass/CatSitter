const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./catsitter.sqlite",
    logging: false
});

module.exports = sequelize;