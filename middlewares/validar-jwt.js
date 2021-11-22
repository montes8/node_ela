const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
               'errorCode': 17,
                'title': 'No hay token en la petición',
                'description': 'Se debe enviar el token generado en el login en cada peticion'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        // leer el usuario que corresponde al uid
        const usuario = await Usuario.findById( uid );

        if( !usuario ) {
            return res.status(401).json({
                'errorCode': 17,
                'title': 'Token no válido - usuario no existe DB',
                'description': 'El usuario no existe en la base de datos' 
            })
        }

        // Verificar si el uid tiene estado true
        if ( !usuario.estado ) {
            return res.status(401).json({
                'errorCode': 17,
                'title': 'Token no válido - usuario con estado: bloqueado',
                'description': 'El usuarios ha sido temporalmente desactivado y/o bloqueado' 
            })
        }
        
        
        req.usuario = usuario;
        next();

    } catch (error) {

        console.log(error);
        res.status(401).json({
            'errorCode': 17,
            'title': 'Token no válido',
            'description':`El usuarios ha sido temporalmente desactivado y/o bloqueado ${error.json}` 
        })
    }

}




module.exports = {
    validarJWT
}