'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('hash.js');

const Usuario = require('../../models/Usuario');

/**
 * POST /usuarios
 * Crea un usuario
 */
router.post('/register', (req,res,next) => {
  try{
  const usuario = new Usuario(req.body);
  usuario.clave = hash.sha256().update(usuario.clave).digest('hex');

  usuario.save((err, usuarioGuardado) => {
      if(err){
          next(err);
          return;
      }
      res.json({ success: true, result: usuarioGuardado });
  });
  }
  catch(err) {
    err.message = 'registerError';
    err.status = 404;
    next(err);
  }
});

router.post('/authenticate', function(req, res, next) {
  try{
  const email = req.body.email;

  Usuario.findOne({email: email}).exec(function(err, usuario) {
    if (err) {
      return next(err);
    }

    if(!usuario) {
      const err = new Error('userNotFound');
      err.status = 404;
      return next(err);
    }

    // Hasheamos la clave pasada por el body para comparar con la clave hasheada de la DB
    console.log(req.body.clave);
    const clave = hash.sha256().update(req.body.clave).digest('hex');
    console.log(clave);

    if (clave != usuario.clave) {
      const err = new Error('incorrectPassword');
      err.status = 404;
      return next(err);
    }

    jwt.sign({ user_id: usuario._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, function(err, token) {
      if (err){
        next(err);
        return;          
      }  
      res.json({success: true, result: token});
    });
  });
}catch(err) {
  err.message = 'loginError';
  err.status = 404;
  next(err);
}
});

module.exports = router;