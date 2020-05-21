const mongoose=require('mongoose');
const shortId=require('shortid');

const urlSchema=new mongoose.Schema({
    url:{
        type:String,
        required:true
    },
    shortUrl:{
        type:String,
        default:shortId.generate()
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    visits:{
        type:Number,
        default:1
    }
});

module.exports=mongoose.model('urlSchema',urlSchema);