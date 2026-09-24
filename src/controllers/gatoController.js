const { Gato, Cliente } = require("../models");

const listar = async (req, res) => {
    try {
        const gatos = await Gato.findAll();

        res.status(200).json(gatos);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao listar gatos."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const gato = await Gato.findByPk(req.params.id);

        if (!gato) {
            return res.status(404).json({
                erro: "Gato não encontrado."
            });
        }

        res.status(200).json(gato);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar gato."
        });
    }
};

const criar = async (req, res) => {
    try {
        const {
            nome,
            idade,
            raca,
            peso,
            observacoes,
            clienteId
        } = req.body;

        if (!nome || idade === undefined || !raca || !clienteId) {
            return res.status(400).json({
                erro: "Nome, idade, raça e clienteId são obrigatórios."
            });
        }

        if (idade < 0) {
            return res.status(400).json({
                erro: "A idade não pode ser negativa."
            });
        }

        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        const gato = await Gato.create({
            nome,
            idade,
            raca,
            peso,
            observacoes,
            clienteId
        });

        res.status(201).json(gato);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar gato."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const gato = await Gato.findByPk(req.params.id);

        if (!gato) {
            return res.status(404).json({
                erro: "Gato não encontrado."
            });
        }

        await gato.update(req.body);

        res.status(200).json(gato);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar gato."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const gato = await Gato.findByPk(req.params.id);

        if (!gato) {
            return res.status(404).json({
                erro: "Gato não encontrado."
            });
        }

        await gato.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao excluir gato."
        });
    }
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};