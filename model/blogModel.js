const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title : {
        type : String,
        require : [true,"Title is Required"]
    },
    descripation : {
        type : String,
        require : [true, "Descripation is also required"]
    },
    image : {
        type : String,
        require : [true, "image is also required"]
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        require : [true,"user is required"]
    }
},
{timestape : true})

const BlogModel = mongoose.model('blog',blogSchema);
module.exports = BlogModel;