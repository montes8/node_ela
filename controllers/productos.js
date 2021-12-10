const { response } = require('express');
const { Producto } = require('../models/producto');


const obtenerProductos = async(req, res = response ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [productos ] = await Promise.all([
        Producto.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json(
        productos
    );
}

const obtenerProducto = async(req, res = response ) => {

    const { id } = req.params;
    const producto = await Producto.findById( id );

    res.json( producto );

}

const crearProducto = async(req, res = response ) => {

    const { estado, ...body } = req.body;

    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if ( productoDB ) {
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
    }

    const producto = new Producto( data );

    // Guardar DB
    await producto.save();

    res.status(200).json(producto);

}

const actualizarProducto = async( req, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;

    if( data.nombre ) {
        data.nombre  = data.nombre.toUpperCase();
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json( producto );

}

const borrarProducto = async(req, res = response ) => {

    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( productoBorrado );
}




module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}