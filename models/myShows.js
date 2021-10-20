const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const {Schema}=mongoose

const myShowsSchema = new Schema({
    artwork_name: {
        type: String,
        required: true,
    },
    artwork_url: {
        type: String,
        required: true,
    },
    artwork_rating: {
        type: Number,
        required: false,
    }
}, { timestamps: true })

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const myShows = mongoose.model('myShowsDb', myShowsSchema)

module.exports = myShows