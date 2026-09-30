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

describe("Gatos", () => {

    test("deve cadastrar um gato com sucesso", async () => {

        // Primeiro criamos um cliente
        const cliente = await request(app)
            .post("/clientes")
            .send({
                nome: "Maria",
                email: "maria@email.com",
                senha: "123456",
                telefone: "88999999999"
            });

        // Depois criamos o gato ligado ao cliente
        const resposta = await request(app)
            .post("/gatos")
            .send({
                nome: "Mel",
                idade: 3,
                raca: "SRD",
                peso: 4.2,
                observacoes: "Gosta de brincar",
                clienteId: cliente.body.id
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.nome).toBe("Mel");
        expect(resposta.body.raca).toBe("SRD");
        expect(resposta.body.clienteId).toBe(cliente.body.id);
    });


    test("deve rejeitar gato com cliente inexistente", async () => {

        const resposta = await request(app)
            .post("/gatos")
            .send({
                nome: "Mel",
                idade: 3,
                raca: "SRD",
                peso: 4.2,
                observacoes: "Gosta de brincar",
                clienteId: 9999
            });

        expect(resposta.status).toBe(404);
        expect(resposta.body.erro).toBe("Cliente não encontrado.");
    });


    test("não deve permitir idade negativa", async () => {

        // Criamos um cliente primeiro
        const cliente = await request(app)
            .post("/clientes")
            .send({
                nome: "João",
                email: "joao@email.com",
                senha: "123456",
                telefone: "88988888888"
            });

        const resposta = await request(app)
            .post("/gatos")
            .send({
                nome: "Nina",
                idade: -1,
                raca: "Persa",
                peso: 3.5,
                clienteId: cliente.body.id
            });

        expect(resposta.status).toBe(400);
        expect(resposta.body.erro).toBe("A idade não pode ser negativa.");
    });

});