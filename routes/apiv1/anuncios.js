'use strict';

const express = require('express');
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth');

// cargar el modelo de Anuncio
const Anuncio = require('../../models/Anuncio');

// router.use(jwtAuth());

/**
 * GET /anuncios
 * Obtener lista de anuncios
 */
router.get('/', async (req, res, next) => {
  try {
    console.log(req.query);
    const filter = {};
    const skip = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const sort = req.query.sort;
    const tag = req.query.tag;
    const venta = req.query.venta;
    const nombre = req.query.nombre;
    const precio = req.query.precio;

    if(tag) {
      filer.tags = tag;
    }

    if(venta) {
      filter.venta = venta;
    }


    if (nombre) {
      filter.nombre = new RegExp("^" + nombre.toLowerCase(), "i");
    }

    console.log("El precio es:  "+precio);

  /*  if(precio)
    {
      filter.precio = {'$gte':'10','$lte':'50'};
    }
*/
    if (precio) {
       switch(precio)
       {
        case '10-50': 
        filter.precio = {'$gte':'10','$lte':'50'};
        break;

        case '10-': filter.precio = {'$gte':'10'};
        break;

        case '-50': filter.precio = {'$lte':'50'};
        break;

        case '50': filter.precio = '50';
        break;

        default: 
        console.log('Rango de precio no valido');
        break;
       }

    }
    
    let rows = await Anuncio.list(filter, skip, limit, sort);
    res.json({ success: true, result: rows }); 
  } catch(err) {
    console.log('Error al recuperar anuncios', err);
    next();
  }
});

module.exports = router;
