const mongoose = require('mongoose')
const {Schema} = mongoose;

const NewsSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        default:'Uncategorized'
    },
    tag:{
        type:String,
        default:'General'
    },
    date:{
        type:Date,
        default:Date.now
    }

});
module.exports=mongoose.model('news',NewsSchema);