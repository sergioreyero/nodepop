'use strict';

const mongoose = require('mongoose');
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// primero creamos el esquema
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

// Creamos un método estático
usuarioSchema.statics.list = function(filters, limit, skip, sort, fields) {
  // obtenemos la query sin ejecutarla
  const query = Usuario.find(filters);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort)
  query.select(fields);
  // ejecutamos la query y devolvemos una promesa
  return query.exec();
}

// y por último creamos el modelo
const Usuario = mongoose.model('Usuario', usuarioSchema);

// y lo exportamos
module.exports = Usuario;