const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required : [true,'Username is required']
    },
    email:{
        type : String,
        required : [true,'email is required']
    },
    password:{
        type : String,
        required : [true,'Password is rquired']
    },
    blogs : [{
        type : mongoose.Types.ObjectId,
        ref : 'blog'
    },
]
},{timestamps: true})

const usermodel = mongoose.model('user',userSchema);
module.exports = usermodel