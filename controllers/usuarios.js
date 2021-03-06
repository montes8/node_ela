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
  "payload": { 
      "success": true, 
      "orden": { 
          "monto": 95, 
          "cuotas": "1", 
          "moneda": "USD", 
          "numeroAutorizacion": "170822-3464", 
          "numeroReferencia": "101020", 
          "numeroPedido": "PAG-200000033464" 
      }, 
      "resultado": { 
          "codigo": 2000, 
          "codigoRespuesta": "VENTA_EXITOSA", 
          "mensaje": "Venta realizada exitosamente", 
          "codigoExterno": "000", 
          "mensajeExterno": "Aprobado y completado con exito", 
          "referencia": { 
              "numId": "9548935", 
              "solicitud": "", 
              "pago": { 
                  "numeroDocumento": "47342160", 
                  "correoAsesor": "correoasesor", 
                  "tipoDocumento": "2", 
                  "telefono": "12345678", 
                  "nombres": "RAPLH VELCI", 
                  "apellidoPaterno": "MELGRA", 
                  "apellidoMaterno": "RVEROS", 
                  "tipoMoneda": "USD", 
                  "correoCliente": "jacarrillo@indracompany.com", 
                  "tipoOperacionCobranza": "CVC", 
                  "nroCuotas": 0, 
                  "tipoOperacionApi": "PAGO_EN_LINEA", 
                  "pagoMultiple": [ 
                      { 
                          "nroPoliza": "989047", 
                          "producto": "VE", 
                          "codigoProducto": "2101", 
                          "documentoPago": "874991253", 
                          "monto": 95, 
                          "nombreProducto": "Seguro vehicular", 
                          "estadoCuota": "Pendiente" 
                      } 
                  ] 
              } 
          } 
      }, 
      "tarjeta": { 
          "numeroTarjeta": "485951****0036", 
          "marca": "VISA" 
      } 
  } 
}


  const listInversionBody ={
    "message": {
      "titulo": "Operaci??n Exitosa",
      "codigo": 10100,
      "descripcion": "Operaci??n Exitosa"
    },
    "payload": {
      "titulo": "Inversi??n",
      "subtitulo": "Conoce el detalle de tu inversi??n",
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
  

    // Encriptar la contrase??a
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
        // Encriptar la contrase??a
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