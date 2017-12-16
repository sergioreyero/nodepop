'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

// cargar el modelo de Usuario
const Usuario = require('../../models/Usuario');

// router.use(jwtAuth());

/**
 * GET /usuarios:email
 * Obtener un usuario
 */
router.get('/:email', async (req, res, next) => {
  try {
      console.log(req.params.email);
  const email = req.params.email;
  const usuario = await Usuario.findOne({ email: email }).exec();
  res.json({ success: true, result: usuario });
  } catch(err) {
    next(err);
  }
});

module.exports = router;