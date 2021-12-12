const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Banner = require('../models/banner');
const Param = require('../models/param');
const Video = require('../models/video');


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

 
  const video= await Video.find().catch(error => {
    res.status(500).json({errorBody})
     throw error});

  res.json(video);


}

const bannerPost = async(req, res = response) => {
    
  const { titulo,descripcion,img,categoria,idProducto} = req.body;
  const banner = new Banner({ titulo,descripcion,img,categoria,idProducto });

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