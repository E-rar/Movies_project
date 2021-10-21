const mongoose = require('mongoose');

const Schema = mongoose.Schema;
//const {Schema}=mongoose

const myShowsSchema = new Schema({
    _id:{
        type:String,
        required:true,
    },
    id: {
        type: String,
        required: true,
    },
    poster_path: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    overview: {
        type: String,
        required: true,
    }
}, { timestamps: true })

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const myShows = mongoose.model('myShowsDB', myShowsSchema)

module.exports = myShows