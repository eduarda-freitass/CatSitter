process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../src/app");
const sequelize = require("../src/database/database");
require("../src/models");

beforeEach(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe("Clientes", () => {

    test("deve cadastrar um cliente com sucesso", async () => {

        const resposta = await request(app)
            .post("/clientes")
            .send({
                nome: "Maria",
                email: "maria@email.com",
                senha: "123456",
                telefone: "88999999999"
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.nome).toBe("Maria");
        expect(resposta.body.email).toBe("maria@email.com");
        expect(resposta.body.senha).toBeUndefined();
    });


    test("deve rejeitar cadastro de cliente sem dados obrigatórios", async () => {

        const resposta = await request(app)
            .post("/clientes")
            .send({
                nome: "Maria"
            });

        expect(resposta.status).toBe(400);
    });

});