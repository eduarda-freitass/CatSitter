const { Cuidador } = require("../models");

const listar = async (req, res) => {
    try {
        const cuidadores = await Cuidador.findAll();

        res.status(200).json(cuidadores);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao listar cuidadores."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const cuidador = await Cuidador.findByPk(req.params.id);

        if (!cuidador) {
            return res.status(404).json({
                erro: "Cuidador não encontrado."
            });
        }

        res.status(200).json(cuidador);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar cuidador."
        });
    }
};

const criar = async (req, res) => {
    try {
        const {
            nome,
            email,
            senha,
            telefone,
            experiencia,
            valorVisita
        } = req.body;

        if (!nome || !email || !senha || !telefone || valorVisita === undefined) {
            return res.status(400).json({
                erro: "Nome, email, senha, telefone e valor da visita são obrigatórios."
            });
        }

        if (valorVisita <= 0) {
            return res.status(400).json({
                erro: "O valor da visita deve ser maior que zero."
            });
        }

        const cuidador = await Cuidador.create({
            nome,
            email,
            senha,
            telefone,
            experiencia,
            valorVisita
        });

        res.status(201).json(cuidador);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar cuidador."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const cuidador = await Cuidador.findByPk(req.params.id);

        if (!cuidador) {
            return res.status(404).json({
                erro: "Cuidador não encontrado."
            });
        }

        await cuidador.update(req.body);

        res.status(200).json(cuidador);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar cuidador."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const cuidador = await Cuidador.findByPk(req.params.id);

        if (!cuidador) {
            return res.status(404).json({
                erro: "Cuidador não encontrado."
            });
        }

        await cuidador.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao excluir cuidador."
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