const { Solicitacao, Gato, Cuidador } = require("../models");

const listar = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao listar solicitações."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar solicitação."
        });
    }
};

const criar = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao criar solicitação."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const solicitacao = await Solicitacao.findByPk(req.params.id);

        if (!solicitacao) {
            return res.status(404).json({
                erro: "Solicitação não encontrada."
            });
        }

        if (solicitacao.status === "CONCLUIDA") {
            return res.status(409).json({
                erro: "Uma solicitação concluída não pode ser alterada."
            });
        }

        await solicitacao.update(req.body);

        res.status(200).json(solicitacao);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar solicitação."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const solicitacao = await Solicitacao.findByPk(req.params.id);

        if (!solicitacao) {
            return res.status(404).json({
                erro: "Solicitação não encontrada."
            });
        }

        await solicitacao.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao excluir solicitação."
        });
    }
};

const aceitar = async (req, res) => {
    try {
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

        await solicitacao.update({
            cuidadorId,
            status: "ACEITA"
        });

        res.status(200).json(solicitacao);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao aceitar solicitação."
        });
    }
};

const concluir = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao concluir solicitação."
        });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir,
    aceitar,
    concluir
};