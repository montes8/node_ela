
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos} = require('../middlewares');

const { paramPost,
        paramPut,
        paramGet} = require('../controllers/parametros.js');

const router = Router();

router.get('/param', paramGet );


router.post('/param',[
    check('titulo', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
], paramPost );


router.put('/param/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],paramPut );




module.exports = router;