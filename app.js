'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var i18n = require('i18n');

var app = express();

require('./lib/connectMongoose');

// inicializa i18n
i18n.configure({
  locales: ['en','es'],
  defaultLocale: 'en',
  directory: __dirname + '/locales'
});
app.use(i18n.init);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'))); // sirve ficheros estáticos que estén en public

// Cargamos nuestras rutas
// app.use('/',      require('./routes/index'));
// app.use('/users', require('./routes/users'));

// Rutas del APIv1 
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // es un error de express-validator
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI(req) ? 
      { message: 'Not valid', errors: err.mapped()} : // para peticones de API
      `Not valid - ${errInfo.param} ${errInfo.msg}`;  // para otras peticiones
  }

  
  
  if (isAPI(req)) { // si es un API devuelvo JSON
    res.json({ success: false, error: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
