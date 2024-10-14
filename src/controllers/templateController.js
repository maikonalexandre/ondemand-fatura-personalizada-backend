const Template = require("../models/template");

class TemplateController {
  // Criar um novo Template
  static async create(req, res) {
    const { nome, codigo, descricao, templateEjs, status } = req.body;
  
    // Validação básica dos campos obrigatórios
    if (!nome || !codigo || !templateEjs || !status) {
      return res.status(400).json({
        message: 'Nome, Código, TemplateEJS e Status são obrigatórios.',
      });
    }
  
    const template = new Template({ nome, codigo, descricao, templateEjs, status });
  
    try {
      const savedTemplate = await template.save();
      res.status(201).json({
        message: 'Template criado com sucesso!',
        template: savedTemplate,
      });
    } catch (error) {
      console.error('Erro ao salvar o template:', error);
      res.status(500).json({
        message: 'Erro ao salvar o template.',
        error: error.message,
      });
    }
  }

  // Buscar todos os Templates
  static async readAll(req, res) {
    try {
      const templates = await Template.find(req.query);
      res.status(200).send(templates);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Buscar um Template por ID
  static async readOne(req, res) {
    try {
      const template = await Template.findById(req.params.id);
      if (!template) return res.status(404).send("Template not found");
      res.status(200).send(template);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Atualizar um Template por ID
  static async update(req, res) {
    const { nome, codigo, descricao, templateEjs, status } = req.body;
  
    // Validação básica dos campos obrigatórios
    if (!nome || !codigo || !templateEjs || !status) {
      return res.status(400).json({
        message: 'Nome, Código, TemplateEJS e Status são obrigatórios.',
      });
    }
  
    try {
      const template = await Template.findByIdAndUpdate(req.params.id, { nome, codigo, descricao, templateEjs, status }, { new: true });
      if (!template) {
        return res.status(404).json({
          message: 'Template não encontrado.',
        });
      }
      res.status(200).json({
        message: 'Template atualizado com sucesso!',
        template: template,
      });
    } catch (error) {
      console.error('Erro ao atualizar o template:', error);
      res.status(500).json({
        message: 'Erro ao atualizar o template.',
        error: error.message,
      });
    }
  }

  // Deletar um Template por ID
  static async delete(req, res) {
    try {
      const template = await Template.findByIdAndDelete(req.params.id);
      if (!template) return res.status(404).send("Template not found");
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = TemplateController;
