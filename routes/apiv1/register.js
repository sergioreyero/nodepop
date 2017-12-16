'use strict';

const express = require('express');
const router = express.Router();

// cargar el modelo de Register
const Usuarios = require('../../models/Usuario');

/**
 * POST /usuarios
 * Crea un usuarios
 */
router.post('/', (req,res,next) => {
    const usuario = new Register(req.body);
    console.log(req.body);
    // lo persistimos en la colección de usuarios
    usuario.save((err, usuarioGuardado) => {
        if(err){
            next(err);
            return;
        }
        res.json({ success: true, result: usuarioGuardado });
    });
});

/**
 * GET /agentes
 * Obtener una lista de agentes
 */
router.get('/', async (req, res, next) => {
    try {
        const rows = await Usuarios.list();
        res.json({ success: true, result:rows });
    } catch (err) {
        next(err);
    }
});

module.exports = router;