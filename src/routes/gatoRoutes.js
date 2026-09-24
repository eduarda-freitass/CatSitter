const express = require("express");

const router = express.Router();

const gatoController = require("../controllers/gatoController");

router.get("/", gatoController.listar);

router.get("/:id", gatoController.buscarPorId);

router.post("/", gatoController.criar);

router.put("/:id", gatoController.atualizar);

router.delete("/:id", gatoController.excluir);

module.exports = router;