const Include = require("../models/include");

class IncludeController {
  // Criar um novo Include
  static async create(req, res) {
    const include = new Include(req.body);
    try {
      await include.save();
      res.status(201).send(include);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Buscar todos os Includes
  static async readAll(req, res) {
    try {
      const includes = await Include.find(req.query);
      res.status(200).send(includes);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Buscar um Include por ID
  static async readOne(req, res) {
    try {
      const include = await Include.findById(req.params.id);
      if (!include) return res.status(404).send("Include não encontrado");
      res.status(200).send(include);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Atualizar um Include por ID
  static async update(req, res) {
    try {
      const include = await Include.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!include) return res.status(404).send("Include não encontrado");
      res.status(200).send(include);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  // Deletar um Include por ID
  static async delete(req, res) {
    try {
      const include = await Include.findByIdAndDelete(req.params.id);
      if (!include) return res.status(404).send("Include não encontrado");
      res.status(200).send("Include deletado");
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = IncludeController;
