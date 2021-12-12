
const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validarCampos} = require('../middlewares');

const { bannerPost,
        bannerPut,
        bannerDelete,
        videoPost,
        videoPut,
        videoDelete,
        paramPost,
        paramPut,
        paramGet,
        videoGet,
        bannerGet} = require('../controllers/parametros.js');

const router = Router();

router.get('/banner', bannerGet );

router.get('/video', videoGet );
router.get('/param', paramGet );

router.post('/banner',[
    check('titulo', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'descripcion  es obligatorio').not().isEmpty(),
    check('idProducto', 'idProducto  es obligatorio').not().isEmpty(),
    check('categoria', 'idCategoria  es obligatorio').not().isEmpty(),
    validarCampos
], bannerPost );

router.post('/video',[
    check('autor', 'El nombre es obligatorio').not().isEmpty(),
    check('nombreVideo', 'El nombre es obligatorio').not().isEmpty(),
    check('idVideo', 'El id de video es obligatorio').not().isEmpty(),
    check('descripcion', 'El id de video es obligatorio').not().isEmpty(),
    validarCampos
], videoPost );

router.post('/param',[
    check('titulo', 'El nombre es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripcion es obligatorio').not().isEmpty(),
    validarCampos
], paramPost );


router.put('/banner/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],bannerPut );


router.put('/param/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],paramPut );


router.put('/video/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
],videoPut );

router.delete('/banner/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
   // check('id').custom( existeUsuarioPorId ),
    validarCampos
],bannerDelete);


router.delete('/video/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
   // check('id').custom( existeUsuarioPorId ),
    validarCampos
],videoDelete);


module.exports = router;