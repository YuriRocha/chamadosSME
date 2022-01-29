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
  console.log("Body Parameter: ", body);
  const call = new Call(body);
  call.requester = params.id;
  call.status = true;
  console.log("Call Object: ", call);
  //save call
  await call.save();
}
