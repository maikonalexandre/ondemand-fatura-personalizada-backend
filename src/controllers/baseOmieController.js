const BaseOmie = require('../models/baseOmie');

class baseOmieController {
  // Criar um novo registro BaseOmie
  static async create(req, res) {
    const baseOmie = new BaseOmie(req.body);
    try {
      await baseOmie.save();
      res.status(201).send(baseOmie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Buscar todos os registros BaseOmie
  static async readAll(req, res) {
    try {
      const basesOmie = await BaseOmie.find();
      res.status(200).send(basesOmie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Buscar um registro BaseOmie por ID
  static async readOne(req, res) {
    try {
      const baseOmie = await BaseOmie.findById(req.params.id);
      if (!baseOmie) return res.status(404).send("Registro BaseOmie não encontrado");
      res.status(200).send(baseOmie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Atualizar um registro BaseOmie por ID
  static async update(req, res) {
    try {
      const baseOmie = await BaseOmie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!baseOmie) return res.status(404).send("Registro BaseOmie não encontrado");
      res.status(200).send(baseOmie);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Deletar um registro BaseOmie por ID
  static async delete(req, res) {
    try {
      const baseOmie = await BaseOmie.findByIdAndDelete(req.params.id);
      if (!baseOmie) return res.status(404).send("Registro BaseOmie não encontrado");
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = baseOmieController;
