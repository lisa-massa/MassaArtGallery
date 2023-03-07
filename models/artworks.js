const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const ArtworkSchema = new Schema({
    title: String,
    image: [ImageSchema],
    artist: String,
    medium: String,
    measurementsCm: {
        type: String,
        min: 5,
        max: 200
    },
    year: {
        type: Number,
        min: 2017,
        max: 2022
    }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);
