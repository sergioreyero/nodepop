'use strict';

const mongoose = require('mongoose');

// primero creamos el esquema
const anuncioSchema = mongoose.Schema({
  nombre: { 
    type: String, 
    index: true,
    required: true
  },
  venta: {
    type: Boolean,
    index: true,
    required: true
  },
  precio: {
    type: Number,
    index: true,
    required: true
  },
  foto: String,
  tags: {
    type: [{
      type: String,
      enum: ['work', 'lifestyle', 'motor', 'mobile']
    }],
    index: true
  }
});

// Creamos un método estático
anuncioSchema.statics.list = function(filters, limit, skip, sort, fields) {
  // obtenemos la query sin ejecutarla
  const query = Anuncio.find(filters);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);
  // ejecutamos la query y devolvemos una promesa
  return query.exec();
}

// y por último creamos el modelo
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// y lo exportamos
module.exports = Anuncio;
