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

describe("Middleware de erro", () => {

    const cliente = {
        nome: "Maria",
        email: "maria@email.com",
        senha: "123456",
        telefone: "88999999999"
    };

    test("deve retornar 409 ao cadastrar email já existente", async () => {

        await request(app).post("/clientes").send(cliente);

        const resposta = await request(app)
            .post("/clientes")
            .send(cliente);

        expect(resposta.status).toBe(409);
        expect(resposta.body.erro).toBe("Já existe um cadastro com esse email.");
    });

    test("deve retornar 400 ao cadastrar email inválido", async () => {

        const resposta = await request(app)
            .post("/clientes")
            .send({ ...cliente, email: "email-invalido" });

        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe("Dados inválidos: email.");
    });

    test("deve retornar 400 em JSON quando o corpo estiver mal formado", async () => {

        const resposta = await request(app)
            .post("/clientes")
            .set("Content-Type", "application/json")
            .send('{"nome": "Maria",');

        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe("JSON inválido no corpo da requisição.");
    });
});
