
const { Router } = require('express');

const { usuariosParameter,
        usuariosBanner} = require('../controllers/parametros.js');

const router = Router();


router.get('/parameter', usuariosParameter );

router.get('/banner', usuariosBanner );


module.exports = router;