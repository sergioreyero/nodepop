'use strict';

const mongoose = require('mongoose');

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

anuncioSchema.statics.list = function(filters, limit, skip, sort, fields) {
  const query = Anuncio.find(filters);
  query.limit(limit);
  query.skip(skip);
  query.sort(sort);
  query.select(fields);

  return query.exec();
}

anuncioSchema.statics.tagList = function(filters) {
    const query = Anuncio.find({});
    query.select('tags');
    return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;
