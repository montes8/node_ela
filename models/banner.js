
const { Schema, model } = require('mongoose');

const BannerSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descrpcion es obligatorio']
    },
    img: {
        type: String,
    },
    categoria: {
        type: String
    },
    idProducto: {
        type: String,
        required: [true, 'El producto es necesario']
    }
});
    


BannerSchema.methods.toJSON = function() {
    const { __v, _id, ...banner  } = this.toObject();
    banner.uid = _id;
    return banner;
}

module.exports = model( 'Banner', BannerSchema );