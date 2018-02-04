'use strict';

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const hash = require('hash.js');
const customError = require('../../lib/CustomError');

const Usuario = require('../../models/Usuario');

/**
 * POST /usuarios
 * Crea un usuario
 */
router.post('/register', (req,res,next) => {
  try{
    console.log(req.body)
  const usuario = new Usuario(req.body);
  usuario.clave = hash.sha256().update(usuario.clave).digest('hex');

  usuario.save((err, usuarioGuardado) => {
      if(err){
        if(err.message.indexOf('E1100',1)){
          next(customError(res.__('duplicateError'), 404));
          return;
        }
        else {
          next(customError(res.__('saveError'), 500));
          return;
        }
      }
      res.json({ success: true, result: usuarioGuardado });
  });
  }
  catch(err) {
    next(customError(res.__('registerError'), 500));
    return;
  }
});

router.post('/authenticate', function(req, res, next) {
  try{
  const email = req.body.email;

  Usuario.findOne({email: email}).exec(function(err, usuario) {
    if (err) {
      next(customError(res.__('execError'), 500));
      return;
    }

    if(!usuario) {
      next(customError(res.__('userNotFound'), 404));
      return;
    }

    // Hasheamos la clave pasada por el body para comparar con la clave hasheada de la DB
    console.log(req.body.clave);
    const clave = hash.sha256().update(req.body.clave).digest('hex');
    console.log(clave);

    if (clave != usuario.clave) {
      next(customError(res.__('incorrectPassword'), 404));
      return;
    }

    jwt.sign({ user_id: usuario._id}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, function(err, token) {
      if (err){
        next(customError(res.__('signError'), 500));
        return;       
      }  
      res.json({success: true, result: token});
    });
  });
}catch(err) {
  next(customError(res.__('loginError'), 500));
  return;
}
});

module.exports = router;