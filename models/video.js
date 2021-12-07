const { Schema, model } = require('mongoose');

const VideoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    idvideo: {
        type: String,
        required: [true, 'El idvideo es obligatorio']
    },
    idvdescripcionideo: {
        type: String,
        required: [true, 'La descipcion es obligatorio']
    }
});
    


VideoSchema.methods.toJSON = function() {
    const { __v, _id, ...video  } = this.toObject();
    video.uid = _id;
    return video;
}

module.exports = model( 'Video', VideoSchema );