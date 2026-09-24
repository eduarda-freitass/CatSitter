const { Cliente } = require("../models");

const listar = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();

        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao listar clientes."
        });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao buscar cliente."
        });
    }
};

const criar = async (req, res) => {
    try {
        const { nome, email, senha, telefone } = req.body;

        if (!nome || !email || !senha || !telefone) {
            return res.status(400).json({
                erro: "Nome, email, senha e telefone são obrigatórios."
            });
        }

        const cliente = await Cliente.create({
            nome,
            email,
            senha,
            telefone
        });

        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao cadastrar cliente."
        });
    }
};

const atualizar = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        await cliente.update(req.body);

        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao atualizar cliente."
        });
    }
};

const excluir = async (req, res) => {
    try {
        const cliente = await Cliente.findByPk(req.params.id);

        if (!cliente) {
            return res.status(404).json({
                erro: "Cliente não encontrado."
            });
        }

        await cliente.destroy();

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            erro: "Erro ao excluir cliente."
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