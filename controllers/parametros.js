const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const errorBody = {
    'success': false,
    'error': {
      'errorCode': 15,
      'errorMessage': 'ocurrio un error inesperado',
      'errorMessageDetail': 'ocurrio un error inesperado'
    }
  }

  const listParameter = [
    {
      "id": "SRt0KAMCI4Q",
      "title": "Sueltate el pelo",
      "duration": 0,
      "durationTotal": 0
    },
    {
      "id":  "mmRBXjVENDQ",
      "title": " Mienteme ",
      "duration": 0,
      "durationTotal": 0
    },
    {
      "id":  "0f3ZHuC-l0c",
      "title": "Nuestro amor",
      "duration": 0,
      "durationTotal": 0
    },
    {
      "id":  "95IaQ8vyqHg",
      "title": "Te quiero mas",
      "duration": 0,
      "durationTotal": 0
    }
  ]

  const listBanner = [
    {
      "id":  0,
      "title": "tini",
      "icon": "https://www.letras.com.br/storage/artista/7/3/0b99.jpg"
    },
    {
      "id":  0,
      "title": "Maria",
      "icon": "https://farras.live/wp-content/uploads/2020/12/fba41729-e05d-498c-a578-0deeee1f0e64.jpg"
    },
    {
      "id":  0,
      "title": "Laurita",
      "icon": "https://i.pinimg.com/originals/00/81/69/0081691546611adb6266749bc50dab1d.jpg"
    },
    {
      "id":  0,
      "title": "tini",
      "icon": "https://www.letras.com.br/storage/artista/7/3/0b99.jpg"
    },
    {
      "id":  0,
      "title": "Maria",
      "icon": "https://farras.live/wp-content/uploads/2020/12/fba41729-e05d-498c-a578-0deeee1f0e64.jpg"
    },
    {
      "id":  0,
      "title": "Laurita",
      "icon": "https://i.pinimg.com/originals/00/81/69/0081691546611adb6266749bc50dab1d.jpg"
    }
   
  ]


const usuariosParameter = async(req = request, res = response) => {

  try{
      res.json(listParameter);
    }catch(error){
      res.status(500).json(errorBody)
    }

  
}

const usuariosBanner = async(req = request, res = response) => {

  try{
      res.json(listBanner);
    }catch(error){
      res.status(500).json(errorBody)
    }

  
}

module.exports = {
    usuariosParameter,
    usuariosBanner
}