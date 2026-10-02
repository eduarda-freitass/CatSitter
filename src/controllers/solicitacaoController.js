const { Solicitacao, Gato, Cuidador } = require("../models");
const filtrarCampos = require("../utils/filtrarCampos");

// status e cuidadorId só mudam pelas rotas /aceitar, /concluir e /cancelar.
const CAMPOS_EDITAVEIS = [
    "dataVisita",
    "horario",
    "servicos",
    "observacoes",
    "valor"
];

const listar = async (req, res) => {
    const solicitacoes = await Solicitacao.findAll({
        where: {
            status: "PENDENTE"
        },
        order: [["createdAt", "ASC"]],
        include: [
            {
                model: Gato
            }
        ]
    });

    res.status(200).json(solicitacoes);
};

const buscarPorId = async (req, res) => {
    const solicitacao = await Solicitacao.findByPk(req.params.id, {
        include: [
            {
                model: Gato
            },
            {
                model: Cuidador
            }
        ]
    });

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    res.status(200).json(solicitacao);
};

const criar = async (req, res) => {
    const {
        dataVisita,
        horario,
        servicos,
        observacoes,
        valor,
        gatoId
    } = req.body;

    if (
        !dataVisita ||
        !horario ||
        !servicos ||
        valor === undefined ||
        !gatoId
    ) {
        return res.status(400).json({
            erro: "Data, horário, serviços, valor e gatoId são obrigatórios."
        });
    }

    if (valor <= 0) {
        return res.status(400).json({
            erro: "O valor deve ser maior que zero."
        });
    }

    const gato = await Gato.findByPk(gatoId);

    if (!gato) {
        return res.status(404).json({
            erro: "Gato não encontrado."
        });
    }

    const solicitacao = await Solicitacao.create({
        dataVisita,
        horario,
        servicos,
        observacoes,
        valor,
        gatoId
    });

    res.status(201).json(solicitacao);
};

const atualizar = async (req, res) => {
    const solicitacao = await Solicitacao.findByPk(req.params.id);

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    if (
        solicitacao.status === "CONCLUIDA" ||
        solicitacao.status === "CANCELADA"
    ) {
        return res.status(409).json({
            erro: "Uma solicitação concluída ou cancelada não pode ser alterada."
        });
    }

    await solicitacao.update(
        filtrarCampos(req.body, CAMPOS_EDITAVEIS)
    );

    res.status(200).json(solicitacao);
};

const excluir = async (req, res) => {
    const solicitacao = await Solicitacao.findByPk(req.params.id);

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    await solicitacao.destroy();

    res.status(204).send();
};

const aceitar = async (req, res) => {
    const { cuidadorId } = req.body;

    if (!cuidadorId) {
        return res.status(400).json({
            erro: "cuidadorId é obrigatório."
        });
    }

    const solicitacao = await Solicitacao.findByPk(req.params.id);

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    if (solicitacao.status !== "PENDENTE") {
        return res.status(409).json({
            erro: "Essa solicitação já foi aceita ou não está disponível."
        });
    }

    const cuidador = await Cuidador.findByPk(cuidadorId);

    if (!cuidador) {
        return res.status(404).json({
            erro: "Cuidador não encontrado."
        });
    }

    // Verifica se o cuidador já possui outra
    // solicitação aceita na mesma data e horário.
    const conflito = await Solicitacao.findOne({
        where: {
            cuidadorId,
            dataVisita: solicitacao.dataVisita,
            horario: solicitacao.horario,
            status: "ACEITA"
        }
    });

    if (conflito) {
        return res.status(409).json({
            erro: "Cuidador já possui uma solicitação nesse dia e horário."
        });
    }

    await solicitacao.update({
        cuidadorId,
        status: "ACEITA"
    });

    res.status(200).json(solicitacao);
};

const concluir = async (req, res) => {
    const solicitacao = await Solicitacao.findByPk(req.params.id);

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    if (solicitacao.status !== "ACEITA") {
        return res.status(409).json({
            erro: "A solicitação precisa estar aceita para ser concluída."
        });
    }

    await solicitacao.update({
        status: "CONCLUIDA"
    });

    res.status(200).json(solicitacao);
};

// Cancelamento de solicitação
const cancelar = async (req, res) => {
    const solicitacao = await Solicitacao.findByPk(req.params.id);

    if (!solicitacao) {
        return res.status(404).json({
            erro: "Solicitação não encontrada."
        });
    }

    // Só pode cancelar solicitações pendentes ou aceitas
    if (
        solicitacao.status !== "PENDENTE" &&
        solicitacao.status !== "ACEITA"
    ) {
        return res.status(409).json({
            erro: "Essa solicitação não pode ser cancelada."
        });
    }

    await solicitacao.update({
        status: "CANCELADA"
    });

    res.status(200).json(solicitacao);
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
    aceitar,
    concluir,
    cancelar
};