const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const call_schema = new Schema({
  requester: {type: String, required: true},
  departament: {type: String, required: true},
  category: {type: String, required: true},
  status: {type: String, required: true},
  message: {type: String, required: true},
  call_date: {type: String} //Lembrar de alterar isso para um date type futuramente
});

call_schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Call', call_schema);
