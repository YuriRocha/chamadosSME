const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const Call = db.Call;

module.exports = {
  addNewCall
  ///listOpenCalls,
  //listClosedCalls,
  //listAllCall,
  //editCalls,
  //removeCall
}

// FUNÇÕES DO CALL service
async function addNewCall(body, params){
  const call = new Call(body);

  //save call
  await call.save();
}
