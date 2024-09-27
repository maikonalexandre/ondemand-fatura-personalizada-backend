const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConfiguracaoSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    codigo: {
      type: String,
      required: true,
    },
    valor: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    baseOmie: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Configuracoes = mongoose.model("Configuracoes", ConfiguracaoSchema);

module.exports = Configuracoes;
