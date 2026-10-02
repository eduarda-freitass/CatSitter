const { Cliente } = require("../models");
const filtrarCampos = require("../utils/filtrarCampos");

const CAMPOS_EDITAVEIS = ["nome", "email", "senha", "telefone"];

const listar = async (req, res) => {
    const clientes = await Cliente.findAll();

    res.status(200).json(clientes);
};

const buscarPorId = async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado."
        });
    }

    res.status(200).json(cliente);
};

const criar = async (req, res) => {
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
};

const atualizar = async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado."
        });
    }

    await cliente.update(filtrarCampos(req.body, CAMPOS_EDITAVEIS));

    res.status(200).json(cliente);
};

const excluir = async (req, res) => {
    const cliente = await Cliente.findByPk(req.params.id);

    if (!cliente) {
        return res.status(404).json({
            erro: "Cliente não encontrado."
        });
    }

    await cliente.destroy();

    res.status(204).send();
};

module.exports = {
    listar,
    buscarPorId,
    criar,
    atualizar,
    excluir
};