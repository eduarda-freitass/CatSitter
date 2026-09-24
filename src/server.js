const app = require("./app");
const sequelize = require("./database/database");

require("./models");

const PORT = 3000;

async function iniciarServidor() {
    try {
        await sequelize.authenticate();

        console.log("Banco de dados conectado.");

        await sequelize.sync();

        console.log("Tabelas criadas com sucesso.");

        app.listen(PORT, () => {
            console.log(`CatSitter API rodando em http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Erro ao iniciar servidor:", error);
    }
}

iniciarServidor();