const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const call_schema = new Schema({
  requester: {type: String, required: true},
  category: {type: String, required: true},
  status: {type: Boolean, required: true},
  message: {type: String, required: true},
  call_date: {type: String}
});

call_schema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Call', call_schema);
