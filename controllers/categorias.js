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
                .skip( Number( 0 ) )
                .limit(Number( 10 )).catch(error => { 
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
    const { nombre,descripcion, estado, recomendado,idUsuario } = req.body;
    const categoria = new Categoria({ nombre,descripcion, estado,recomendado,idUsuario});

    // Guardar DB
    await categoria.save().catch(error => { throw error});

    res.json(categoria);

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