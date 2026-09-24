const express = require("express");

const router = express.Router();

const cuidadorController = require("../controllers/cuidadorController");

router.get("/", cuidadorController.listar);

router.get("/:id", cuidadorController.buscarPorId);

router.post("/", cuidadorController.criar);

router.put("/:id", cuidadorController.atualizar);

router.delete("/:id", cuidadorController.excluir);

module.exports = router;