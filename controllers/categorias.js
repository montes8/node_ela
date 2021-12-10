const { response } = require('express');
const Categoria = require('../models/categoria');

const errorBody = {
    'success': false,
    'error': {
      'errorCode': 15,
      'errorMessage': 'ocurrio un error inesperado',
      'errorMessageDetail': 'ocurrio un error inesperado'
    }
  }


const obtenerCategorias = async(req, res = response ) => {

    const categorias =  await  Categoria.find()
                .skip( Number( 10 ) )
                .limit(Number( 0 )).catch(error => { 
            res.status(500).json(errorBody)
            throw error
        });

            if(categorias){
                res.json(categorias);
                return
            }
         
            res.json([]);
}

const obtenerCategoria = async(req, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id )
                            .populate('usuario', 'nombre');

    res.json( categoria );

}

const crearCategoria = async(req, res = response ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    // Guardar DB
    await categoria.save();

    res.status(201).json(categoria);

}

const actualizarCategoria = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json( categoria );

}

const borrarCategoria = async(req, res =response ) => {

    const { id } = req.params;
    const categoriaBorrada = await Categoria.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( categoriaBorrada );
}




module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}