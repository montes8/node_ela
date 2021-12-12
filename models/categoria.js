const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    descripcion: {
        type: String,
        required: [true, 'El descripcion es obligatorio'],
    },
    estado: {
        type: Boolean,
        default: true
    },
    recomendado: {
        type: Boolean,
        default: true
    },
    idUsuario: {
        type: String,
        default: 'id'
    }
});


CategoriaSchema.methods.toJSON = function() {
    const { __v,_id, ...data  } = this.toObject();
    data.uid = _id;
    return data;
}


module.exports = model( 'Categoria', CategoriaSchema );
