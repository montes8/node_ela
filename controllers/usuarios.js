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

const listPortafolioBody = {
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
          "tasa": "",
          "disclaimer": "Rimac no arriesga tu inversion para mantener una renta moderada",
          "icono": "false",
          "esHtml": false
        }
      ]
    }
  }


  const listInversionBody ={
    "message": {
      "titulo": "Operación Exitosa",
      "codigo": 10100,
      "descripcion": "Operación Exitosa"
    },
    "payload": {
      "titulo": "Inversión",
      "subtitulo": "Conoce el detalle de tu inversión",
      "parametros": [
        {
          "key": "Saldo de cuenta base",
          "valor": "US$ 870.80",
          "icono": "balanceaccount",
          "separador": false
        },
        {
          "key": "Saldo de cuenta ahorro",
          "valor": "US$ 198,450.46",
          "icono": "pinkaccount",
          "separador": true
        },
        {
          "key": "Valor de rescate",
          "valor": "US$ 188,527.94",
          "icono": "",
          "separador": false
        },
        {
          "key": "Prima invertida",
          "valor": "US$ 200,00",
          "icono": "",
          "separador": false
        },
        {
          "key": "Prima base",
          "valor": "US$ 3,283.90",
          "icono": "",
          "separador": false
        },
        {
          "key": "Prima ahorro",
          "valor": "US$ 196,716.10",
          "icono": "",
          "separador": false
        },
        {
          "key": "Tiempo transcurrido",
          "valor": "3 meses",
          "icono": "",
          "separador": false
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

const usuariosInversion = async(req = request, res = response) => {

  try{
      res.json(listInversionBody);
    }catch(error){
      res.status(500).json(errorBody)
    }

}

const usuariosPortafolio = async(req = request, res = response) => {

    try{
        res.json(listPortafolioBody);
      }catch(error){
        res.status(500).json(errorBody)
      }

 }

const usuariosPost = async(req, res = response) => {
    
    const { nombre,apellidos, correo, password,telefono,direccion,img,banner, rol } = req.body;
    const usuario = new Usuario({ nombre,apellidos, correo,password,telefono,direccion, img,banner, rol });

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
    const { _id, password, ...resto } = req.body;

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

const usuariosActive = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos
  // const usuario = await Usuario.findByIdAndDelete( id );

  const usuario = await Usuario.findByIdAndUpdate( id, { estado: true } ).catch(error => { throw error});


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
    usuariosPortafolio,
    usuariosInversion,
    usuariosActive
}