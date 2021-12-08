const { validationResult } = require('express-validator');


const validarCampos = ( req, res, next ) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({
            'errorCode': 17,
            'title': 'Campos Enviados incorrectos',
            'description': `${JSON.stringify(errors)}`
    } );
    }

    next();
}



module.exports = {
    validarCampos
}
