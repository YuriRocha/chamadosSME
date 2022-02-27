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
  listClosedCalls,
  editCall,
  removeCall
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

async function editCall(params, body){
  // checar se é admin
  const user = await User.findById(params.id).select('-hash');
  if(user.role !== 'admin'){
    return {message: "Você não tem autorização para fechar esse chamado."};
  }
  // fazer update no status
  if(body.status == ""){
    return {message: "Por favor preencha o status do chamado."};
  }

  if(body.status != ""){
    await Call.findOneAndUpdate(
        { "_id" : params.idcall},
        { "$set": { "status": body.status }},
        function(err, info) {
            if(err){console.log(err);}
            //console.log(info);
    }).clone();
  }

  return {message: "O chamado foi atualizado com sucesso!"};
}

async function removeCall(body){
  await Call.deleteOne({ _id: body.idcall });
  return {message: "O chamado foi deletado com sucesso!"};
}
