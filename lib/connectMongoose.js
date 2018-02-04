'use strict';

const mongoose = require('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', err => {
  console.log('Error!', err);
  process.exit(1);
});

conn.once('open', () => {
  console.log(`Conectado a MongoDB en ${mongoose.connection.name}`);
})

mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  useMongoClient: true    
});

module.exports = conn;
