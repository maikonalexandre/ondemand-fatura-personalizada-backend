const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const YAML = require("yamljs");
const path = require("path");

const app = express();

// Middlewares globais
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// **Rotas públicas** - Não requerem autenticação

// Usar o schemaOpenAPI.yaml como documentação da API
app.use("/open-api", (req, res) => {
  const schemaOpenAPI = YAML.load(path.join(__dirname, "./schemaOpenAPI.yaml"));
  res.json(schemaOpenAPI);
});

app.use("/status", require("./routers/statusRouter")); // Rota de status
app.use("/auth", require("./routers/authRouter")); // Rotas de autenticação (login, etc.)

// Rotas dos webhooks
app.use("/webhooks", require("./routers/webhookRouter"));

// **Middleware de autenticação** - Aplica-se apenas às rotas que necessitam de proteção
app.use(require("./middlewares/authMiddleware"));

// **Middleware de rastreabilidade** - Aplica-se para todas rotas protegidas
app.use(require("./middlewares/rastreabilidadeMiddleware"));

// ** Rotas protegidas ** - Requerem autenticação
app.use("/usuarios", require("./routers/usuarioRouter"));
app.use("/base-omies", require("./routers/baseOmieRouter"));
app.use("/configuracoes", require("./routers/configuracaoRouter"));
app.use("/moedas", require("./routers/moedaRouter"));
app.use("/templates", require("./routers/templateRouter"));
app.use("/includes", require("./routers/includeRouter"));
app.use("/logs", require("./routers/logRouter"));

// Middleware de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo deu errado!");
});

module.exports = app;