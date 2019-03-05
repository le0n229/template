const mongoose = require('mongoose');

const clientSchema = mongoose.Schema({
  userName: { type: String, unique: true },
  password: String,

});

module.exports = mongoose.model('Client', clientSchema);
