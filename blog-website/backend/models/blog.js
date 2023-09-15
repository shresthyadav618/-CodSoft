const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title:String,
    content: String,
    file: {
        data: Buffer,
    contentType: String
    },
    summary: String,
    author: String,
    time: String,
    path:String,
    uid:String,
});

const blogModel = mongoose.model('blogs',blogSchema);
module.exports = blogModel;