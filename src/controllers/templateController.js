const Template = require('../models/template');

class TemplateController {
  // Criar um novo Template
  static async create(req, res) {
    const template = new Template(req.body);
    try {
      await template.save();
      res.status(201).send(template);
    } catch (error) {
      res.status(500).send(error);
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
    try {
      const template = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!template) return res.status(404).send("Template not found");
      res.status(200).send(template);
    } catch (error) {
      res.status(500).send(error);
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