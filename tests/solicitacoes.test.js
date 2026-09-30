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

describe("Solicitações", () => {

    // Função auxiliar para criar cliente + gato
    async function criarClienteEGato() {

        const cliente = await request(app)
            .post("/clientes")
            .send({
                nome: "Maria",
                email: `maria${Date.now()}@email.com`,
                senha: "123456",
                telefone: "88999999999"
            });

        const gato = await request(app)
            .post("/gatos")
            .send({
                nome: "Mel",
                idade: 3,
                raca: "SRD",
                peso: 4.2,
                observacoes: "Gosta de brincar",
                clienteId: cliente.body.id
            });

        return {
            cliente: cliente.body,
            gato: gato.body
        };
    }


    // Função auxiliar para criar um cuidador
    async function criarCuidador() {

        const cuidador = await request(app)
            .post("/cuidadores")
            .send({
                nome: "Carlos",
                email: `carlos${Date.now()}@email.com`,
                senha: "123456",
                telefone: "88977777777",
                experiencia: "Experiência com gatos",
                valorVisita: 50
            });

        return cuidador.body;
    }


    test("deve criar uma solicitação com sucesso", async () => {

        const { gato } = await criarClienteEGato();

        const resposta = await request(app)
            .post("/solicitacoes")
            .send({
                dataVisita: "2026-10-10",
                horario: "14:00",
                servicos: "Alimentação e limpeza da caixa",
                observacoes: "Dar atenção para a gata",
                valor: 50,
                gatoId: gato.id
            });

        expect(resposta.status).toBe(201);
        expect(resposta.body.gatoId).toBe(gato.id);
        expect(resposta.body.status).toBe("PENDENTE");
    });


    test("deve aceitar uma solicitação pendente", async () => {

        const { gato } = await criarClienteEGato();
        const cuidador = await criarCuidador();

        const solicitacao = await request(app)
            .post("/solicitacoes")
            .send({
                dataVisita: "2026-10-10",
                horario: "14:00",
                servicos: "Alimentação e limpeza",
                observacoes: "Visita normal",
                valor: 50,
                gatoId: gato.id
            });

        expect(solicitacao.status).toBe(201);

        const resposta = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/aceitar`)
            .send({
                cuidadorId: cuidador.id
            });

        expect(resposta.status).toBe(200);
        expect(resposta.body.status).toBe("ACEITA");
        expect(resposta.body.cuidadorId).toBe(cuidador.id);
    });


    test("não deve permitir aceitar uma solicitação que já foi aceita", async () => {

        const { gato } = await criarClienteEGato();

        const cuidador1 = await criarCuidador();

        const cuidador2 = await request(app)
            .post("/cuidadores")
            .send({
                nome: "Ana",
                email: `ana${Date.now()}@email.com`,
                senha: "123456",
                telefone: "88966666666",
                experiencia: "Cuidados com gatos",
                valorVisita: 60
            });

        const solicitacao = await request(app)
            .post("/solicitacoes")
            .send({
                dataVisita: "2026-10-10",
                horario: "14:00",
                servicos: "Alimentação",
                observacoes: "Visita normal",
                valor: 50,
                gatoId: gato.id
            });

        expect(solicitacao.status).toBe(201);

        // Primeiro cuidador aceita
        const primeiraAceitacao = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/aceitar`)
            .send({
                cuidadorId: cuidador1.id
            });

        expect(primeiraAceitacao.status).toBe(200);

        // Segundo cuidador tenta aceitar
        const segundaAceitacao = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/aceitar`)
            .send({
                cuidadorId: cuidador2.body.id
            });

        expect(segundaAceitacao.status).toBe(409);
        expect(segundaAceitacao.body.erro)
            .toBe("Essa solicitação já foi aceita ou não está disponível.");
    });


    test("deve concluir uma solicitação aceita", async () => {

        const { gato } = await criarClienteEGato();
        const cuidador = await criarCuidador();

        const solicitacao = await request(app)
            .post("/solicitacoes")
            .send({
                dataVisita: "2026-10-10",
                horario: "14:00",
                servicos: "Alimentação",
                observacoes: "Visita normal",
                valor: 50,
                gatoId: gato.id
            });

        expect(solicitacao.status).toBe(201);

        const aceitacao = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/aceitar`)
            .send({
                cuidadorId: cuidador.id
            });

        expect(aceitacao.status).toBe(200);

        const resposta = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/concluir`);

        expect(resposta.status).toBe(200);
        expect(resposta.body.status).toBe("CONCLUIDA");
    });


    test("não deve concluir uma solicitação que ainda está pendente", async () => {

        const { gato } = await criarClienteEGato();

        const solicitacao = await request(app)
            .post("/solicitacoes")
            .send({
                dataVisita: "2026-10-10",
                horario: "14:00",
                servicos: "Alimentação",
                observacoes: "Visita normal",
                valor: 50,
                gatoId: gato.id
            });

        expect(solicitacao.status).toBe(201);

        const resposta = await request(app)
            .patch(`/solicitacoes/${solicitacao.body.id}/concluir`);

        expect(resposta.status).toBe(409);
        expect(resposta.body.erro)
            .toBe("A solicitação precisa estar aceita para ser concluída.");
    });

});