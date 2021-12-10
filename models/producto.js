const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    idUsuario: {
        type: String ,
        default: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    puntuacion: {
        type: Number,
        default: 0
    },
    idCategoria: {
        type: String ,
        default: 'categoria',
        required: true
    },
    descripcion: { type: String },
    subDescripcion: { type: String },
    img: { type: String },
    banner: { type: String },
    dias: { type: String, defult: 'Lunes a viernes' },
    horaInicio :{type: String,defult: '09:00'},
    horaFin :{type: String,defult: '18:00'},
    favorito: { type: Boolean, defult: false }
});


ProductoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Producto', ProductoSchema );
