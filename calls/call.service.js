const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Call = db.Call;
const User = db.User;

module.exports = {
  addNewCall,
  listAllCalls,
  listOpenCalls,
  listClosedCalls
  //editCalls,
  //removeCall
}

// FUNÇÕES DO CALL service

async function addNewCall(body, params){
  const call = new Call(body);
  call.requester = params.id;
  call.status = 'open';

  //save call
  await call.save();
}

async function listAllCalls(params){
  const user = await User.findById(params.id).select('-hash');
  if(user.role !== 'admin'){
    return {message: "Você não tem autorização para listar os chamados! Apenas os administradores do sistemas possuem essa permissão."};
  }
  return Call.find();
}

async function listOpenCalls(params){
  const user = await User.findById(params.id).select('-hash');
  if(user.role !== 'admin'){
    return {message: "Você não tem autorização para listar os chamados abertos! Apenas os administradores do sistemas possuem essa permissão."};
  }

  // pesquisar no banco de dados e retornar todas as calls com status == true
  return Call.find({status: 'open'});
}

async function listClosedCalls(params){
  const user = await User.findById(params.id).select('-hash');
  if(user.role !== 'admin'){
    return {message: "Você não tem autorização para listar os chamados abertos! Apenas os administradores do sistemas possuem essa permissão."};
  }

  // pesquisar no banco de dados e retornar todas as calls com status == true
  return Call.find({status: 'closed'});
}
