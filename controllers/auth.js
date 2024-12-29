const { response } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');

const { generarJWT } = require('../helpers/generar-jwt');


const loginResponse =  { 
    "token": "EOBE_uBSGYw", 
    "name": "NICKI NICOLE"}

    const errorBody = {
        'success': false,
        'error': {
          'errorCode': 15,
          'errorMessage': 'ocurrio un error inesperado',
          'errorMessageDetail': 'ocurrio un error inesperado'
        }
      }

const loginTest = async(req = request, res = response) => {

    try{
        res.json(loginResponse);
    
      }catch(error){
        res.status(500).json(errorBody)
      }
  
  }


const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
      
        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                  'errorCode': 15,
                  'title': 'Password no son correctos - correo',
                  'description': 'uno de los campos ingresados son incorrectos, corrogelos e intentalo de nuevo'
            });
        }

        // SI el usuario está activo
        if ( !usuario.estado ) {
            return res.status(400).json({
                'errorCode': 16,
                'title': 'Usuario / Password no son correctos - estado: false',
                'description': 'uno de los campos ingresados son incorrectos, corrogelos e intentalo de nuevo'
            
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                'errorCode': 17,
                'title': 'Usuario / Password no son correctos - password',
                'description': 'uno de los campos ingresados son incorrectos, corrogelos e intentalo de nuevo'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            'errorCode': 17,
            'title': 'Hable con el administrador',
            'description': 'uno de los campos ingresados son incorrectos, corrogelos e intentalo de nuevo'
    
        });
    }   

}



module.exports = {
    login,
    loginTest
}