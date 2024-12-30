const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Param = require('../models/param');


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

const paramPost = async(req, res = response) => {
    
  const { titulo,descripcion, enableCategory} = req.body;
  const param = new Param({ titulo,descripcion, enableCategory});

  // Guardar en BD
  await param.save().catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(
    param
  );
}

const paramPut = async(req, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;
  const param = await Param.findByIdAndUpdate( id, resto ).catch(error => { 
    res.status(500).json(errorBody)
    throw error});

  res.json(param);
}

module.exports = {
    paramPost,
    paramPut,
    paramGet
}