const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Banner = require('../models/banner');
const Param = require('../models/param');
const Video = require('../models/video');

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
      "idVideo": "SRt0KAMCI4Q",
      "autor": "Tiny",
      "descripcion": "Sueltate el pelo",
      "nombreVideo": "Sueltate el pelo",
      "duracion": 0,
      "duracionTotal": 0
    },
    {
      "id":  "mmRBXjVENDQ",
      "idVideo": "mmRBXjVENDQ",
      "autor": "Tiny",
      "descripcion": "Sueltate el pelo",
      "nombreVideo": " Mienteme ",
      "duracion": 0,
      "duracionTotal": 0
    },
    {
      "id":  "0f3ZHuC-l0c",
      "idVideo": "0f3ZHuC-l0c",
      "autor": "Tiny",
      "descripcion": "Sueltate el pelo",
      "nombreVideo": "Nuestro amor",
      "duracion": 0,
      "duracionTotal": 0
    },
    {
      "id":  "95IaQ8vyqHg",
      "idVideo":  "95IaQ8vyqHg",
      "autor": "Tiny",
      "descripcion": "Sueltate el pelo",
      "nombreVideo": "Te quiero mas",
      "duracion": 0,
      "duracionTotal": 0
    }
  ]

  const listBanner = [
    {
      "id":  1,
      "title": "tini",
      "icon": "https://www.letras.com.br/storage/artista/7/3/0b99.jpg"
    },
    {
      "id":  2,
      "title": "Maria",
      "icon": "https://farras.live/wp-content/uploads/2020/12/fba41729-e05d-498c-a578-0deeee1f0e64.jpg"
    },
    {
      "id":  3,
      "title": "Laurita",
      "icon": "https://i.pinimg.com/originals/00/81/69/0081691546611adb6266749bc50dab1d.jpg"
    },
    {
      "id":  4,
      "title": "tini",
      "icon": "https://www.letras.com.br/storage/artista/7/3/0b99.jpg"
    },
    {
      "id":  5,
      "title": "Maria",
      "icon": "https://farras.live/wp-content/uploads/2020/12/fba41729-e05d-498c-a578-0deeee1f0e64.jpg"
    },
    {
      "id":  6,
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

const paramGet = async(req = request, res = response) => {

  

   const param = await Param.findOne().catch(error => { 
    res.status(500).json(errorBody)
     throw error});

   if(param){
    res.json(param);
    return
   }

   res.json({});
}
const bannerGet = async(req = request, res = response) => {

  const banner = await Banner.find().catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(banner);


}
const videoGet = async(req = request, res = response) => {

 
  const video = await Video.find().catch(error => {
    res.status(500).json(errorBody)
     throw error});

  res.json(video);


}

const bannerPost = async(req, res = response) => {
    
  const { titulo,img, idcategoria} = req.body;
  const banner = new Banner({ titulo,img,idcategoria });

  // Guardar en BD
  await banner.save().catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(
    banner);
}

const videoPost = async(req, res = response) => {
    
  const { autor,idVideo,nombreVideo,descripcion} = req.body;
  const video = new Video({ autor,idVideo,nombreVideo,descripcion});

  // Guardar en BD
  await video.save().catch(error => { 
    res.status(500).json(errorBody)
    throw error
  
  });

  res.json(
    video
  );
}

const paramPost = async(req, res = response) => {
    
  const { titulo,descripcion, registro} = req.body;
  const param = new Param({ titulo,descripcion, registro});

  // Guardar en BD
  await param.save().catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(
    param
  );
}

const bannerPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const banner = await Banner.findByIdAndUpdate( id, resto ).catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(banner);
}

const videoPut = async(req, res = response) => {

  const { id } = req.params;
  const { _id, ...resto } = req.body;

  const video = await Video.findByIdAndUpdate( id, resto ).catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(video);
}

const paramPut = async(req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  const param = await Param.findByIdAndUpdate( id, resto ).catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(param);
}

const bannerDelete = async(req, res = response) => {

  const { id } = req.params;

  // Fisicamente lo borramos

  const banner = await Banner.findByIdAndDelete( id).catch(error => { throw error});


  res.json(banner);
}

const videoDelete = async(req, res = response) => {
  const { id } = req.params;
  // Fisicamente lo borramos
  const video = await Video.findByIdAndDelete( id).catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(video);
}

module.exports = {
    usuariosParameter,
    usuariosBanner,
    bannerPost,
    bannerPut,
    bannerDelete,
    videoPost,
    videoPut,
    videoDelete,
    paramPost,
    paramPut,
    paramGet,
    videoGet,
    bannerGet
}