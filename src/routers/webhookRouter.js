// src/routers/webhookRouter.js
const express = require("express");
const faturaService = require("../services/faturaService");
const BaseOmie = require("../models/baseOmie");
const { getConfig } = require("../utils/config");

const router = express.Router();

router.post("/gerar-fatura", async (req, res) => {
  console.log("Webhook recebido");

  try {
    const { appKey, event, ping, topic } = req.body;

    // Verificar se o webhook é um ping
    if (ping === "omie") return res.status(200).json({ message: "pong" });

    // Verificar se o tópico é "OrdemServico.EtapaAlterada"
    if (topic !== "OrdemServico.EtapaAlterada")
      return res.status(200).json({ message: "Tópico ignorado." });

    const etapaGerarFatura = await getConfig("omie-etapa-gerar", appKey);
    if (event.etapa !== etapaGerarFatura)
      return res.status(200).json({ message: "Etapa ignorada." });

    if (!appKey || !event.idOrdemServico) {
      return res
        .status(400)
        .json({ error: "Faltam parâmetros: appKey ou dados do evento incompletos." });
    }

    // Consultar o banco de dados para obter o appSecret
    const baseOmie = await BaseOmie.findOne({ appKey: appKey });
    if (!baseOmie) return res.status(404).send({ error: "AppKey não encontrada" });

    // Estrutura esperada para gerar a fatura
    const authOmie = {
      appKey: appKey,
      appSecret: baseOmie.appSecret,
    };

    // Acionar o serviço de geração da fatura
    faturaService.gerar(authOmie, event.idOrdemServico);

    res.status(200).json({ message: "Webhook recebido. Fatura sendo gerada." });
  } catch (error) {
    console.error("Erro ao processar o webhook:", error);
    res.status(500).json({ error: "Erro ao processar o webhook." });
  }
});

module.exports = router;
