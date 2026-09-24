const express = require("express");

const router = express.Router();

const solicitacaoController = require("../controllers/solicitacaoController");

router.get("/", solicitacaoController.listar);

router.get("/:id", solicitacaoController.buscarPorId);

router.post("/", solicitacaoController.criar);

router.put("/:id", solicitacaoController.atualizar);

router.delete("/:id", solicitacaoController.excluir);

router.patch("/:id/aceitar", solicitacaoController.aceitar);

router.patch("/:id/concluir", solicitacaoController.concluir);

module.exports = router;