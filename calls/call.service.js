const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Call = db.Call;
const User = db.User;

module.exports = {
  addNewCall,
  listAllCalls
  ///listOpenCalls,
  //listClosedCalls,
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
    return {message: "Você não tem autorização para listar os chamados!"};
  }
  return Call.find();
}
