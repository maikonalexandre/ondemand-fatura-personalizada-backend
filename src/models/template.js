const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  nome: String,
  codigo: String,
  descricao: String,
  templateEjs: String,
  status: {
    type: String,
    enum: ["ativo", "inativo", "arquivado"],
    default: "ativo",
  },
});

const Template =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema, "templates");

module.exports = Template;
