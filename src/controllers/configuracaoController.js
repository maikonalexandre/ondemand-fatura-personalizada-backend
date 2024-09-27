const Configuracao = require('../models/configuracao');

// Criar uma nova configuração
const criarConfiguracao = async (req, res) => {
  try {
    const novaConfiguracao = new Configuracao(req.body);
    const configuracaoSalva = await novaConfiguracao.save();
    res.status(201).json(configuracaoSalva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obter todas as configurações
const obterConfiguracao = async (req, res) => {
  try {
    const configuracoes = await Configuracao.find();
    res.status(200).json(configuracoes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obter uma configuração por ID
const obterConfiguracaoPorId = async (req, res) => {
  try {
    const configuracao = await Configuracao.findById(req.params.id);
    if (!configuracao) {
      return res.status(404).json({ message: 'Configuração não encontrada' });
    }
    res.status(200).json(configuracao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualizar uma configuração por ID
const atualizarConfiguracao = async (req, res) => {
  try {
    const configuracaoAtualizada = await Configuracao.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!configuracaoAtualizada) {
      return res.status(404).json({ message: 'Configuração não encontrada' });
    }
    res.status(200).json(configuracaoAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Excluir uma configuração por ID
const excluirConfiguracao = async (req, res) => {
  try {
    const configuracaoExcluida = await Configuracao.findByIdAndDelete(req.params.id);
    if (!configuracaoExcluida) {
      return res.status(404).json({ message: 'Configuração não encontrada' });
    }
    res.status(200).json({ message: 'Configuração excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarConfiguracao,
  obterConfiguracao,
  obterConfiguracaoPorId,
  atualizarConfiguracao,
  excluirConfiguracao,
};