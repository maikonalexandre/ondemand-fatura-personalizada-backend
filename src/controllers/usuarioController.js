// backend/controllers/UsuarioController.js

const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
  const { nome, email, senha, status, permissoes } = req.body;
  try {
    // Verifica se há algum usuário ativo no banco de dados
    const usuarioAtivo = await Usuario.findOne({ status: "ativo" });

    if (usuarioAtivo) {
      return res.status(400).json({ error: "Já existe um usuário ativo no sistema" });
    }

    // Cria um novo usuário se não houver nenhum usuário ativo
    const novoUsuario = new Usuario({ nome, email, senha, status, permissoes });
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};

exports.registrarPrimeiroUsuario = async (req, res) => {
  const { nome, email, senha, status, permissoes } = req.body;
  try {
    // Verificar se existe algum usuário ativo
    const usuarioAtivo = await Usuario.findOne({ status: "ativo" });
    if (usuarioAtivo) {
      return res.status(400).json({ error: "Já existe um usuário ativo" });
    }

    // Criar e salvar o novo usuário
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
};

exports.registrarUsuario = async (req, res) => {
  try {
    const novoUsuario = new Usuario(req.body);
    await novoUsuario.save();
    res.status(201).json(novoUsuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao registrar usuário" });
  }
}; 

exports.loginUsuario = async (req, res) => {
  const { email, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    if (!usuario.status === "ativo") {
      return res.status(403).json({ error: "Usuário inativo" });
    }
    const token = usuario.gerarToken();
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: "Erro ao fazer login" });
  }
};
exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-senha');
    res.json(usuarios);
  } catch (error) {
    res.status(400).json({ error: "Erro ao listar usuários" });
  }
};

exports.obterUsuario = async (req, res) => {
  console.log(req.params.id);
  try {
    const usuario = await Usuario.findById(req.params.id).select('-senha');
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Erro ao obter usuário" });
  }
};

exports.atualizarUsuario = async (req, res) => {
  try {
    const { senha } = req.body;

    // Se a senha foi passada, criptografá-la antes de atualizar
    if (senha) {
      const salt = await bcrypt.genSalt(10);
      req.body.senha = await bcrypt.hash(senha, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
};


exports.excluirUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: "Usuário não encontrado" });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "Erro ao excluir usuário" });
  }
};

// Função para validar o token e retornar os dados do usuário
exports.validarToken = async (req, res) => {
  try {
    // Se o middleware `protect` passou, `req.user` já está preenchido
    res.json(req.user);
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
  }
};
