const { Cuidador, Solicitacao } = require("../models");
const sequelize = require("../database/database");
const filtrarCampos = require("../utils/filtrarCampos");

const CAMPOS_EDITAVEIS = [
    "nome",
    "email",
    "senha",
    "telefone",
    "experiencia",
    "valorVisita"
];

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

        await cuidador.update(filtrarCampos(req.body, CAMPOS_EDITAVEIS));

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

        // Solicitações aceitas por esse cuidador voltam a ficar disponíveis
        // para os demais, em vez de ficarem ACEITAS sem cuidador.
        await sequelize.transaction(async (transaction) => {
            await Solicitacao.update(
                {
                    status: "PENDENTE",
                    cuidadorId: null
                },
                {
                    where: {
                        cuidadorId: cuidador.id,
                        status: "ACEITA"
                    },
                    transaction
                }
            );

            await cuidador.destroy({ transaction });
        });

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