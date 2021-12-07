const { Schema, model } = require('mongoose');

const ParamSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion obligatorio']
    },
    registro : {
        type: Boolean,
        default: true
    }
});
    


ParamSchema.methods.toJSON = function() {
    const { __v, _id, ...param  } = this.toObject();
    param.uid = _id;
    return param;
}

module.exports = model( 'Param', ParamSchema );