const express = require("express");
const cors = require("cors");

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

module.exports = app;