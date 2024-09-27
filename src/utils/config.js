const Configuracoes = require("../models/configuracao");
const BaseOmie = require("../models/baseOmie");

async function getConfig(codigo, appKey) {
  try {
    // Busca a baseOmie correspondente à appKey
    const baseOmie = await BaseOmie.findOne({ appKey });

    if (!baseOmie) throw new Error(`BaseOmie com appKey ${appKey} não encontrada`);

    // Busca a configuração no banco de dados diretamente pelo código e baseOmie
    let configuracao = await Configuracoes.findOne({ codigo, baseOmie: baseOmie._id });

    // Se não encontrar a configuração específica da baseOmie, busca a configuração geral
    if (!configuracao) configuracao = await Configuracoes.findOne({ codigo, baseOmie: null });

    if (!configuracao) return null;

    return configuracao.valor;
  } catch (error) {
    console.error(`Erro ao buscar configuração: ${error.message}`);
    throw error;
  }
}

module.exports = { getConfig };
