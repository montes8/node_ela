const { Schema, model } = require('mongoose');

const VideoSchema = Schema({
    autor: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    idVideo: {
        type: String,
        required: [true, 'El idvideo es obligatorio']
    },
    nombreVideo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },

    descripcion: {
        type: String,
        required: [true, 'La descr esopcion obligatorio']
    }
});
    


VideoSchema.methods.toJSON = function() {
    const { __v, _id, ...video  } = this.toObject();
    video.uid = _id;
    return video;
}

module.exports = model( 'Video', VideoSchema );