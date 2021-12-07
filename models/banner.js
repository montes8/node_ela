
const { Schema, model } = require('mongoose');

const BannerSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type: String
    },
    idcategoria: {
        type: String,
        required: [true, 'La categoria es necesario'],
        unique: true
    }
});
    


BannerSchema.methods.toJSON = function() {
    const { __v, _id, ...banner  } = this.toObject();
    banner.uid = _id;
    return banner;
}

module.exports = model( 'Banner', BannerSchema );