const express = require("express");
const cors = require("cors");
const tratarErros = require("./middlewares/tratarErros");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/clientes", require("./routes/clienteRoutes"));
app.use("/cuidadores", require("./routes/cuidadorRoutes"));
app.use("/gatos", require("./routes/gatoRoutes"));
app.use("/solicitacoes", require("./routes/solicitacaoRoutes"));

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada."
    });
});

// Precisa ficar por último para receber os erros de todas as rotas.
app.use(tratarErros);

module.exports = app;