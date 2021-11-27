const { response, request } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');

const errorBody = {
    'success': false,
    'error': {
      'errorCode': 15,
      'errorMessage': 'ocurrio un error inesperado',
      'errorMessageDetail': 'ocurrio un error inesperado'
    }
  }

const listGlossaryBody = {
    "message": {
      "titulo": "Operación Exitosa",
      "codigo": 10100,
      "descripcion": "Operación Exitosa"
    },
    "payload": {
      "titulo": "Portafolio",
      "subtitulo": "Conoce el detalle de tu portafolio",
      "portafolios": [
        {
          "titulo": "Moderado",
          "cantidad": "Invertido: 100%",
          "tasa": "TAZA DEL 9% ",
          "disclaimer": "Rda.imac no arriega tu inversion para poder matener una rentabilidad modera",
          "icono": "false"
        },
        {
            "titulo": "Moderado",
            "cantidad": "Invertido: 100%",
            "tasa": "TAZA DEL 9% ",
            "disclaimer": "Rda.imac no arriega tu inversion para poder matener una rentabilidad modera",
            "icono": "false"
          }
      ]
    }
  }



const usuariosGet = async(req = request, res = response) => {

   /* var ip = require("ip");
    var ipaddress = ip.address()

    console.log( ip.address() );*/

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]).catch(error => { throw error});

    res.json({
        total,
        usuarios
    });
}

const usuariosGlossary = async(req = request, res = response) => {

    try{
        res.json(listGlossaryBody);
      }catch(error){
        res.status(500).json(errorBody)
      }
  
    
 }

const usuariosPost = async(req, res = response) => {
    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en BD
    await usuario.save().catch(error => { throw error});

    res.json({
        usuario
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    if ( password ) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto ).catch(error => { throw error});

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDeleteInactive = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete( id );

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } ).catch(error => { throw error});


    res.json(usuario);
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    // Fisicamente lo borramos

    const usuario = await Usuario.findByIdAndDelete( id).catch(error => { throw error});


    res.json(usuario);
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDeleteInactive,
    usuariosDelete,
    usuariosGlossary
}