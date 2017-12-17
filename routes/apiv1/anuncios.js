'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

const Anuncio = require('../../models/Anuncio');

router.use(jwtAuth());

/**
 * GET /anuncios
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    const skip = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const tag = req.query.tag;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio;

    if(tag) {
      filter.tags = tag;
    }

    if(venta) {
      filter.venta = venta;
    }


    if (nombre) {
      filter.nombre = new RegExp("^" + nombre.toLowerCase(), "i");
    }

    if(precio){
      if (precio.indexOf('-') === -1){
        filter.precio = precio;
      }
      else {
        const paramPrecio = precio.split('-');
        if(paramPrecio[0]){
         filter.precio = {'$gte': paramPrecio[0]};
        }
        if(paramPrecio[1]){
          filter.precio = {'$lte': paramPrecio[1]};
        }
        if(paramPrecio[0] && paramPrecio[1])
        {
          filter.precio = {'$gte': paramPrecio[0], '$lte': paramPrecio[1]};
        }
      }
    }

    let rows = await Anuncio.list(filter, skip, limit, sort);
    res.json({ success: true, result: rows }); 
  } catch(err) {
    err.message = 'adsNotFound';
    err.status = 404;
    next(err);
  }
});

/**
 * /GET anuncios/tags
 * Todos los tags
 */
router.get('/tags', async (req, res, next) => {
  try {
    const rows = await Anuncio.tagList({});
    let tag = new Array();
    let n=0;

    for (let i=0; i < rows.length; i++) {      
      let row = rows[i].tags;
        for(let m=0; m < row.length; m++) {
          tag[n]=row[m];
          n++;
        }    
    }
    console.log(tag);
    tag=tag.unique();
    res.json({ success: true, result: tag });
  }
  catch(err) {
    err.message = 'tagsNotFound';
    err.status = 404;
    next(err);
  }
});

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

module.exports = router;
