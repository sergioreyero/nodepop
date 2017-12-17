'use strict';

const mongoose = require('mongoose');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const usuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    index: true,
    required: true,
    match: regexEmail,
    unique: true
  },
  clave: {
    type: String,
    require: true,
  }
});

usuarioSchema.statics.list = function(filters, limit, skip, sort, fields) {
  const query = Usuario.find(filters);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort)
  query.select(fields);

  return query.exec();
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;